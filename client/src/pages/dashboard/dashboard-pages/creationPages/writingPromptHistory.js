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
import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage';
import { Document, Page } from 'react-pdf';

const WritingPromptHistory = () => {
  // State Variables
  const [creationCards, setCreationCards] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Access User's firebase storage folder
  const auth = getAuth();
  const user = auth.currentUser;
  const storage = getStorage();
  const userId = user.uid;
  const userFolderRef = ref(storage, `users/${userId}/writing-prompts`);

  console.log(userFolderRef);

  useEffect(() => {
    listAll(userFolderRef)
      .then(res => {
        const creationCardsPromises = res.items.map(async itemRef => {
          const downloadURL = await getDownloadURL(itemRef);
          console.log(downloadURL);

          const name = itemRef.name.replace(/\d/g, '');

          function truncateText(name) {
            const words = name.split('');
            const truncatedWords = words.slice(0, 21);
            return truncatedWords.join('') + '...';
          }

          return (
            <>
              <div className="lessonPlan">
                <FolderCard
                  type="pdf"
                  key={itemRef.name}
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
        <div>
          {<ImHistory className="historyicon" />} Writing Prompt History
        </div>
        <a target="_blank" href="https://educationcopilot.com/requests/">
          <div className="request">
            {<ImPlus className="historyicon plusicon" />} Create New
          </div>
        </a>
      </div>
      <Wrapper>
        <h5>Your Previous Writing Prompts</h5>
        <div className="files">{creationCards}</div>
      </Wrapper>
    </div>
  );
};

export default WritingPromptHistory;
