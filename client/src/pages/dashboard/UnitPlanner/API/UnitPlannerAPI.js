// Hooks and React Imports
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, useCallback, CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { decode } from 'html-entities';
import ClipLoader from 'react-spinners/ClipLoader';
import RingLoader from 'react-spinners/RingLoader';
import PropagateLoader from 'react-spinners/PropagateLoader';
import RiseLoader from 'react-spinners/RiseLoader';
import '../multiform.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Firebase Imports
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
  setDoc,
  orderBy,
  addDoc,
} from 'firebase/firestore';
import { getAuth } from '@firebase/auth';
import { db } from '../../../../firebase.config';

const UnitPlanner = props => {
  // States
  const [completionsForUser, setCompletionsForUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [unitUpdated, setUnitUpdated] = useState(false);
  const [unitID, setUnitID] = useState('');
  const [completion, setCompletion] = useState({
    unitName: '',
    unitLength: '',
    time: '',
    gradeLevel: '',
    id: '',
  });

  const unitName = props.unitName;
  const unitStandards = props.unitStandards;
  const unitDetails = props.unitDetails;
  const unitLength = props.unitLength;

  useEffect(() => {
    console.log('unitName', unitName);
    console.log('unitStandards', unitStandards);
    console.log('unitDetails', unitDetails);
    console.log('unitLength', unitLength);
  }, [unitName, unitStandards, unitDetails, unitLength]);

  // Match States
  const [matchTitle, setMatchTitle] = useState(null);
  const [matchFirst, setMatchFirst] = useState(null);
  const [matchSecond, setMatchSecond] = useState(null);
  const [matchThird, setMatchThird] = useState(null);
  const [matchFourth, setMatchFourth] = useState(null);
  const [matchFifth, setMatchFifth] = useState(null);
  const [matchSixth, setMatchSixth] = useState(null);
  const [matchSeventh, setMatchSeventh] = useState(null);
  const [matchEighth, setMatchEighth] = useState(null);
  const [matchNinth, setMatchNinth] = useState(null);
  const [matchTenth, setMatchTenth] = useState(null);
  const [matchEleventh, setMatchEleventh] = useState(null);
  const [matchTwelfth, setMatchTwelfth] = useState(null);
  const [matchThirteenth, setMatchThirteenth] = useState(null);
  const [matchFourteenth, setMatchFourteenth] = useState(null);
  const [matchFifteenth, setMatchFifteenth] = useState(null);
  const [titleFirst, setTitleFirst] = useState(null);
  const [titleSecond, setTitleSecond] = useState(null);
  const [titleThird, setTitleThird] = useState(null);
  const [titleFourth, setTitleFourth] = useState(null);
  const [titleFifth, setTitleFifth] = useState(null);
  const [titleSixth, setTitleSixth] = useState(null);
  const [titleSeventh, setTitleSeventh] = useState(null);
  const [titleEighth, setTitleEighth] = useState(null);
  const [titleNinth, setTitleNinth] = useState(null);
  const [titleTenth, setTitleTenth] = useState(null);
  const [titleEleventh, setTitleEleventh] = useState(null);
  const [titleTwelfth, setTitleTwelfth] = useState(null);
  const [titleThirteenth, setTitleThirteenth] = useState(null);
  const [titleFourteenth, setTitleFourteenth] = useState(null);
  const [titleFifteenth, setTitleFifteenth] = useState(null);

  const navigate = useNavigate();

  // Get current user
  const auth = getAuth();
  const user = auth.currentUser;

  const completionRef = useRef(null);
  completionRef.current = completion;

  async function getFilteredDataFromDBForUser(collectionName, filter) {
    const auth = getAuth();
    const user = auth.currentUser;
    const docsToAdd = [];
    let dbQuery;
    if (filter === 'All Tools') {
      dbQuery = query(
        collection(db, collectionName),
        where('userId', '==', user.uid)
      );
    } else if (Array.isArray(filter)) {
      dbQuery = query(
        collection(db, collectionName),
        where('userId', '==', user.uid),
        where('application', 'in', filter)
      );
    }

    const querySnapshot = await getDocs(dbQuery);
    querySnapshot.forEach(doc => {
      docsToAdd.push({
        ...doc.data(),
        id: doc.id,
      });
    });

    docsToAdd.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
    setCompletionsForUser(docsToAdd);
  }

  React.useEffect(() => getFilteredDataFromDBForUser('units', 'All Tools'), []);

  // Function to save unit to database
  async function saveUnitToDB(unitName, data) {
    data = {
      ...data,
      userId: user.uid,
      timestamp: Date.now(),
    };
    const ref = await addDoc(collection(db, unitName), data);
    setUnitID(ref.id);
    return ref;
  }

  async function storeUnit(unitName, unitLength, unitStandards, unitDetails) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const dataToSave = {
      unitName,
      unitLength,
      unitStandards,
      unitDetails,
    };

    await saveUnitToDB(`units`, dataToSave)
      .then(ref => {
        setCompletion({
          ...dataToSave,
          id: ref.id,
        });
        console.log('Saved successfully, ref: ', ref);
        setUnitID(ref.id);
      })
      .catch(err => console.log('error', err));
  }

  async function fetchApi(unitName, unitLength, unitStandards, unitDetails) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    notify();

    const raw = JSON.stringify({
      unitName,
      unitLength,
      unitStandards,
      unitDetails,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      `${window.location.origin}/api/v1/completions/unitOverviewCompletion`,
      requestOptions
    )
      .then(response => response.json())
      .then(async result => {
        console.log('unitOverviewCompletion ===', result);
        let textResult = decode(result.choices[0].text);

        // First Day
        var regex = /<day1>(.*?)<\/day1>/s;
        if (textResult.match(regex) === null) {
          console.log('Title 7 ====', 'No Data');
        } else {
          var matchFirst = textResult.match(regex);
          console.log('Day 1 ====', matchFirst[1]);
          setMatchFirst(matchFirst[1]);
        }

        // Second Day
        var regex = /<day2>(.*?)<\/day2>/s;
        if (textResult.match(regex) === null) {
          console.log('Title 7 ====', 'No Data');
        } else {
          var matchSecond = textResult.match(regex);
          console.log('Day 2 ====', matchSecond[1]);
          setMatchSecond(matchSecond[1]);
        }

        // Third Day
        var regex = /<day3>(.*?)<\/day3>/s;
        if (textResult.match(regex) === null) {
          console.log('Title 7 ====', 'No Data');
        } else {
          var matchThird = textResult.match(regex);
          console.log('Day 3 ====', matchThird[1]);
          setMatchThird(matchThird[1]);
        }

        // Fourth Day
        var regex = /<day4>(.*?)<\/day4>/s;
        if (textResult.match(regex) === null) {
          console.log('Title 7 ====', 'No Data');
        } else {
          var matchFourth = textResult.match(regex);
          console.log('Day 4 ====', matchFourth[1]);
          setMatchFourth(matchFourth[1]);
        }

        // Fifth Day
        var regex = /<day5>(.*?)<\/day5>/s;
        if (textResult.match(regex) === null) {
          console.log('Title 7 ====', 'No Data');
        } else {
          var matchFifth = textResult.match(regex);
          console.log('Day 5 ====', matchFifth[1]);
          setMatchFifth(matchFifth[1]);
        }

        // Sixth Day
        var regex = /<day6>(.*?)<\/day6>/s;
        if (textResult.match(regex) === null) {
          console.log('Title 7 ====', 'No Data');
        } else {
          var matchSixth = textResult.match(regex);
          console.log('Day 6 ====', matchSixth[1]);
          setMatchSixth(matchSixth[1]);
        }

        // Seventh Day
        var regex = /<day7>(.*?)<\/day7>/s;
        if (textResult.match(regex) === null) {
          console.log('Title 7 ====', 'No Data');
        } else {
          var matchSeventh = textResult.match(regex);
          console.log('Day 7 ====', matchSeventh[1]);
          setMatchSeventh(matchSeventh[1]);
        }

        // Eighth Day
        var regex = /<day8>(.*?)<\/day8>/s;
        if (textResult.match(regex) === null) {
          console.log('Day 8 ====', 'No Data');
        } else {
          var matchEighth = textResult.match(regex);
          console.log('Day 8 ====', matchEighth[1]);
          setMatchEighth(matchEighth[1]);
        }

        // Ninth Day
        var regex = /<day9>(.*?)<\/day9>/s;
        if (textResult.match(regex) === null) {
          console.log('Day 9 ====', 'No Data');
        } else {
          var matchNinth = textResult.match(regex);
          console.log('Day 9 ====', matchNinth[1]);
          setMatchNinth(matchNinth[1]);
        }

        // Tenth Day
        var regex = /<day10>(.*?)<\/day10>/s;
        if (textResult.match(regex) === null) {
          console.log('Day 10 ====', 'No Data');
        } else {
          var matchTenth = textResult.match(regex);
          console.log('Day 10 ====', matchTenth[1]);
          setMatchTenth(matchTenth[1]);
        }

        // Eleventh Day
        var regex = /<day11>(.*?)<\/day11>/s;
        if (textResult.match(regex) === null) {
          console.log('Day 11 ====', 'No Data');
        } else {
          var matchEleventh = textResult.match(regex);
          console.log('Day 11 ====', matchEleventh[1]);
          setMatchEleventh(matchEleventh[1]);
        }

        // Twelfth Day
        var regex = /<day12>(.*?)<\/day12>/s;
        if (textResult.match(regex) === null) {
          console.log('Day 12 ====', 'No Data');
        } else {
          var matchTwelfth = textResult.match(regex);
          console.log('Day 12 ====', matchTwelfth[1]);
          setMatchTwelfth(matchTwelfth[1]);
        }

        // Thirteenth Day
        var regex = /<day13>(.*?)<\/day13>/s;
        if (textResult.match(regex) === null) {
          console.log('Day 13 ====', 'No Data');
        } else {
          var matchThirteenth = textResult.match(regex);
          console.log('Day 13 ====', matchThirteenth[1]);
          setMatchThirteenth(matchThirteenth[1]);
        }

        // Fourteenth Day
        var regex = /<day14>(.*?)<\/day14>/s;
        if (textResult.match(regex) === null) {
          console.log('Day 14 ====', 'No Data');
        } else {
          var matchFourteenth = textResult.match(regex);
          console.log('Day 14 ====', matchFourteenth[1]);
          setMatchFourteenth(matchFourteenth[1]);
        }

        // Fifteenth Day
        var regex = /<day15>(.*?)<\/day15>/s;
        if (textResult.match(regex) === null) {
          console.log('Day 15 ====', 'No Data');
        } else {
          var matchFifteenth = textResult.match(regex);
          console.log('Day 15 ====', matchFifteenth[1]);
          setMatchFifteenth(matchFifteenth[1]);
        }

        // Title First Day
        var regex = /<title1>(.*?)<\/title1>/s;
        if (textResult.match(regex) === null) {
          console.log('Title 7 ====', 'No Data');
        } else {
          var titleFirst = textResult.match(regex);
          console.log('Title 1 ====', titleFirst[1]);
          setTitleFirst(titleFirst[1]);
        }

        // Title Second Day
        var regex = /<title2>(.*?)<\/title2>/s;
        if (textResult.match(regex) === null) {
          console.log('Title 7 ====', 'No Data');
        } else {
          var titleSecond = textResult.match(regex);
          console.log('Title 2 ====', titleSecond[1]);
          setTitleSecond(titleSecond[1]);
        }

        // Title Third Day
        var regex = /<title3>(.*?)<\/title3>/s;
        if (textResult.match(regex) === null) {
          console.log('Title 7 ====', 'No Data');
        } else {
          var titleThird = textResult.match(regex);
          console.log('Title 3 ====', titleThird[1]);
          setTitleThird(titleThird[1]);
        }

        // Title Fourth Day
        var regex = /<title4>(.*?)<\/title4>/s;
        if (textResult.match(regex) === null) {
          console.log('Title 7 ====', 'No Data');
        } else {
          var titleFourth = textResult.match(regex);
          console.log('Title 4 ====', titleFourth[1]);
          setTitleFourth(titleFourth[1]);
        }

        // Title Fifth Day
        var regex = /<title5>(.*?)<\/title5>/s;
        if (textResult.match(regex) === null) {
          console.log('Title 7 ====', 'No Data');
        } else {
          var titleFifth = textResult.match(regex);
          console.log('Title 5 ====', titleFifth[1]);
          setTitleFifth(titleFifth[1]);
        }

        // Title Sixth Day
        var regex = /<title6>(.*?)<\/title6>/s;
        if (textResult.match(regex) === null) {
          console.log('Title 7 ====', 'No Data');
        } else {
          var titleSixth = textResult.match(regex);
          console.log('Title 6 ====', titleSixth[1]);
          setTitleSixth(titleSixth[1]);
        }

        // Title Seventh Day
        var regex = /<title7>(.*?)<\/title7>/s;
        if (textResult.match(regex) === null) {
          console.log('Title 7 ====', 'No Data');
        } else {
          var titleSeventh = textResult.match(regex);
          console.log('Title 7 ====', titleSeventh[1]);
          setTitleSeventh(titleSeventh[1]);
        }

        // Title Eighth Day
        var regex = /<title8>(.*?)<\/title8>/s;
        if (textResult.match(regex) === null) {
          console.log('Title 8 ====', 'No Data');
        } else {
          var titleEighth = textResult.match(regex);
          console.log('Title 8 ====', titleEighth[1]);
          setTitleEighth(titleEighth[1]);
        }

        // Title Ninth Day
        var regex = /<title9>(.*?)<\/title9>/s;
        if (textResult.match(regex) === null) {
          console.log('Title 9 ====', 'No Data');
        } else {
          var titleNinth = textResult.match(regex);
          console.log('Title 9 ====', titleNinth[1]);
          setTitleNinth(titleNinth[1]);
        }

        // Title Tenth Day
        var regex = /<title10>(.*?)<\/title10>/s;
        if (textResult.match(regex) === null) {
          console.log('Title 10 ====', 'No Data');
        } else {
          var titleTenth = textResult.match(regex);
          console.log('Title 10 ====', titleTenth[1]);
          setTitleTenth(titleTenth[1]);
        }

        // Title Eleventh Day
        var regex = /<title11>(.*?)<\/title11>/s;
        if (textResult.match(regex) === null) {
          console.log('Title 11 ====', 'No Data');
        } else {
          var titleEleventh = textResult.match(regex);
          console.log('Title 11 ====', titleEleventh[1]);
          setTitleEleventh(titleEleventh[1]);
        }

        // Title Twelfth Day
        var regex = /<title12>(.*?)<\/title12>/s;
        if (textResult.match(regex) === null) {
          console.log('Title 12 ====', 'No Data');
        } else {
          var titleTwelfth = textResult.match(regex);
          console.log('Title 12 ====', titleTwelfth[1]);
          setTitleTwelfth(titleTwelfth[1]);
        }

        // Title Thirteenth Day
        var regex = /<title13>(.*?)<\/title13>/s;
        if (textResult.match(regex) === null) {
          console.log('Title 13 ====', 'No Data');
        } else {
          var titleThirteenth = textResult.match(regex);
          console.log('Title 13 ====', titleThirteenth[1]);
          setTitleThirteenth(titleThirteenth[1]);
        }

        // Title Fourteenth Day
        var regex = /<title14>(.*?)<\/title14>/s;
        if (textResult.match(regex) === null) {
          console.log('Title 14 ====', 'No Data');
        } else {
          var titleFourteenth = textResult.match(regex);
          console.log('Title 14 ====', titleFourteenth[1]);
          setTitleFourteenth(titleFourteenth[1]);
        }

        // Title Fifteenth Day
        var regex = /<title15>(.*?)<\/title15>/s;
        if (textResult.match(regex) === null) {
          console.log('Title 15 ====', 'No Data');
        } else {
          var titleFifteenth = textResult.match(regex);
          console.log('Title 15 ====', titleFifteenth[1]);
          setTitleFifteenth(titleFifteenth[1]);
        }

        setUnitUpdated(true);
      })
      .catch(error => console.log('error', error));
  }

  const onSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    await fetchApi(unitName, unitLength, unitStandards, unitDetails);
    await storeUnit(unitName, unitLength, unitStandards, unitDetails);
  };

  function nl2br(str, is_xhtml) {
    var breakTag =
      is_xhtml || typeof is_xhtml === 'undefined' ? '<br/>' : '<br>';
    return (str + '').replace(
      /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
      '$1' + breakTag + '$2'
    );
  }

  useEffect(() => {
    if (unitUpdated) {
      // setIsLoading(false);
      const docRef = doc(db, 'units', unitID);
      console.log('MATCHFIRST TEST ====', nl2br(matchFirst));
      updateDoc(docRef, {
        day1: { match: matchFirst ? nl2br(matchFirst) : '' },
        day2: { match: matchSecond ? nl2br(matchSecond) : '' },
        day3: { match: matchThird ? nl2br(matchThird) : '' },
        day4: { match: matchFourth ? nl2br(matchFourth) : '' },
        day5: { match: matchFifth ? nl2br(matchFifth) : '' },
        day6: { match: matchSixth ? nl2br(matchSixth) : '' },
        day7: { match: matchSeventh ? nl2br(matchSeventh) : '' },
        day8: { match: matchEighth ? nl2br(matchEighth) : '' },
        day9: { match: matchNinth ? nl2br(matchNinth) : '' },
        day10: { match: matchTenth ? nl2br(matchTenth) : '' },
        day11: { match: matchEleventh ? nl2br(matchEleventh) : '' },
        day12: { match: matchTwelfth ? nl2br(matchTwelfth) : '' },
        day13: {
          match: matchThirteenth ? nl2br(matchThirteenth) : '',
        },
        day14: {
          match: matchFourteenth ? nl2br(matchFourteenth) : '',
        },
        day15: { match: matchFifteenth ? nl2br(matchFifteenth) : '' },
        // Titles
        title1: titleFirst ? titleFirst : '',
        title2: titleSecond ? titleSecond : '',
        title3: titleThird ? titleThird : '',
        title4: titleFourth ? titleFourth : '',
        title5: titleFifth ? titleFifth : '',
        title6: titleSixth ? titleSixth : '',
        title7: titleSeventh ? titleSeventh : '',
        title8: titleEighth ? titleEighth : '',
        title9: titleNinth ? titleNinth : '',
        title10: titleTenth ? titleTenth : '',
        title11: titleEleventh ? titleEleventh : '',
        title12: titleTwelfth ? titleTwelfth : '',
        title13: titleThirteenth ? titleThirteenth : '',
        title14: titleFourteenth ? titleFourteenth : '',
        title15: titleFifteenth ? titleFifteenth : '',
      }).then(() => {
        setIsLoading(false);
        navigate(`/unit-planner/${unitID}`);
      });
    }
  }, [unitUpdated]);

  // const countdown = () => {
  //   let timeLeft = unitLength * 4;

  // Create a timer loop
  //   const timer = setInterval(() => {
  //     // If time left is greater than 0
  //     if (timeLeft > 0 && window.location.pathname === '/unit-planner') {
  //       // Update timeLeft
  //       timeLeft -= 1;

  //       // If the URL has changed, clear the timer
  //       if (window.location.pathname !== '/unit-planner') {
  //         clearInterval(timer);
  //       } else {
  //         document.querySelector(
  //           '.countdown'
  //         ).innerHTML = `${timeLeft} seconds`;
  //       }
  //     }
  //     // Else clear the timer
  //     else {
  //       clearInterval(timer);
  //     }
  //   }, 1000);
  // };

  // eslint-disable

  const notify = () =>
    toast('🦄  Now sit back and relax!', {
      position: 'top-right',
      autoClose: unitLength * 4 * 1100,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  return (
    <div className="unitpage">
      <form onSubmit={onSubmit}>
        <button
          className="btn btn-block create"
          type="submit"
          disabled={isLoading}
        >
          {!isLoading && <>Create Unit 🚀</>}
          {isLoading && (
            <RiseLoader color={'white'} loading={isLoading} size={7} />
          )}
        </button>
        {/* {isLoading && <div className="countdown">{countdown()}</div>} */}
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};

export default UnitPlanner;
