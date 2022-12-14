// Hooks and Context Imports
import { useAppContext } from '../../../../context/appContext';
import { useEffect, useState } from 'react';

//Design Imports
import Loading from '../../../../components/Loading';
import FolderCard from '../../../../components/FolderCard';
import Wrapper from '../../../../assets/wrappers/WorkshopTools';
import PageBtnContainer from '../../../../components/PageBtnContainer';
import { ImHistory } from 'react-icons/im';
import { ImPlus } from 'react-icons/im';
import './Creations.css';

// Firebase Imports
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from '@firebase/auth';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from 'firebase/storage';
import { Document, Page } from 'react-pdf';

const PowerpointHistory = () => {
  // State Variables
  const [creationCards, setCreationCards] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Access User's firebase storage folder
  const auth = getAuth();
  const user = auth.currentUser;
  const storage = getStorage();
  const userId = user.uid;
  const userFolderRef = ref(storage, `users/${userId}/powerpoints`);

  console.log(userFolderRef);

  useEffect(() => {
    listAll(userFolderRef)
      .then(res => {
        res.prefixes.forEach(folderRef => {
          // All the prefixes under userFolderRef.
          // You may call listAll() recursively on them.
        });
        res.items.forEach(itemRef => {
          console.log(itemRef);
        });
        const creationCardsPromises = res.items.map(async itemRef => {
          const downloadURL = await getDownloadURL(itemRef);
          console.log(downloadURL);

          const name = itemRef.name.replace(/\d/g, '');

          function truncateText(name) {
            const words = name.split('');
            const truncatedWords = words.slice(0, 22);
            return truncatedWords.join('') + '...';
          }

          return (
            <>
              <div className="lessonPlan">
                <FolderCard
                  key={itemRef.name}
                  type="ppt"
                  toolName={truncateText(name)}
                  fileUrl={downloadURL}
                  lastName={
                    <Document file={downloadURL}>
                      <Page pageNumber={1} scale={0.3} />
                    </Document>
                  }
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
        <div>{<ImHistory className="historyicon" />} PowerPoint Creations</div>
        <a target="_blank" href="https://educationcopilot.com/requests/">
          <div className="request">
            {<ImPlus className="historyicon plusicon" />} Request a New Tool
          </div>
        </a>
      </div>
      <Wrapper>
        <h5>Your Previous Slideshows</h5>
        <div className="files">{creationCards}</div>
      </Wrapper>
    </div>
  );
};

export default PowerpointHistory;
