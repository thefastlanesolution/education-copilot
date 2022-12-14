// Hooks and Context Imports
import { useEffect, useState } from 'react';

//Design Imports
import FolderCard from '../../../../components/FolderCard';
import Wrapper from '../../../../assets/wrappers/WorkshopTools';
import { ImHistory } from 'react-icons/im';
import { ImPlus } from 'react-icons/im';
import './Creations.css';

// Firebase Imports
import { getAuth } from '@firebase/auth';
import {
  getStorage,
  ref,
  getDownloadURL,
  getMetadata,
  listAll,
} from 'firebase/storage';
import { Document, Page } from 'react-pdf';

const RecipeHistory = () => {
  // State Variables
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [creationCards, setCreationCards] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Access User's firebase storage folder
  const auth = getAuth();
  const user = auth.currentUser;
  const storage = getStorage();
  const userId = user.uid;
  const userFolderRef = ref(storage, `users/${userId}/recipes/`);

  // console.log(userFolderRef);

  useEffect(() => {
    listAll(userFolderRef)
      .then(res => {
        const creationCardsPromises = res.prefixes.map(async itemRef => {
          // console.log('itemRef ==>', itemRef);

          const fileMetaData = getMetadata(itemRef);

          console.log('fileMetaData ==>', fileMetaData);

          const result = itemRef._location.path_.split(
            `users/${userId}/recipes/`
          );

          return (
            <>
              <div className="lessonPlan">
                <FolderCard
                  type="folder"
                  key={result[1]}
                  toolName={result[1]}
                />
              </div>
            </>
          );
        });
        Promise.all(creationCardsPromises).then(creationCards => {
          setCreationCards(creationCards);
          setDataLoaded(true);
        });
      })
      .catch(error => {
        console.log("Couldn't get files");
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="creations">
      <div className="pageheader">
        <div>{<ImHistory className="historyicon" />} Recipe History</div>
        <a target="_blank" href="https://educationcopilot.com/requests/">
          {/* <div className="request">
            {<ImPlus className="historyicon plusicon" />} Create New
          </div> */}
        </a>
      </div>
      <Wrapper>
        <h5>Your Previous Recipes</h5>
        <div className="files">{creationCards}</div>
        <br />
        <br />
        <h5>Selected Recipe</h5>
        <div className="files">{creationCards}</div>
      </Wrapper>
    </div>
  );
};

export default RecipeHistory;
