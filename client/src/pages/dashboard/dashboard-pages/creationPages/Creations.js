// Hooks and React Imports
import { useAppContext } from '../../../../context/appContext';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Design Imports
import Loading from '../../../../components/Loading';
import FolderCard from '../../../../components/FolderCard';
import Wrapper from '../../../../assets/wrappers/WorkshopTools';
import PageBtnContainer from '../../../../components/PageBtnContainer';
import { ImHistory, ImPlus, ImFolder } from 'react-icons/im';
import './Creations.css';

// Firebase Imports
import { getAuth } from '@firebase/auth';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  getMetadata,
} from 'firebase/storage';
import { Document, Page } from 'react-pdf';

const Creations = () => {
  const [creationCards, setCreationCards] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [sortedItems, setSortedItems] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;
  const storage = getStorage();
  const userId = user.uid;
  const userFolderRef = ref(storage, `users/${userId}`);

  useEffect(() => {
    listAll(userFolderRef).then(res => {
      res.prefixes.forEach(folderRef => {
        listAll(folderRef)
          .then(res => {
            res.items.forEach(async itemRef => {
              const fileMetaData = await getMetadata(itemRef);

              console.log(fileMetaData.contentType);

              // Two Content Types
              // "application/vnd.openxmlformats-officedocument.presentationml.presentation"
              // "application/pdf"

              const { timeCreated } = fileMetaData;

              const fileObject = {
                name: itemRef.name,
                timeCreated: timeCreated,
                downloadURL: await getDownloadURL(itemRef),
              };

              console.log('timeCreated ===>', fileObject.timeCreated);

              console.log('itemRef ===>', itemRef);

              const downloadURL = await getDownloadURL(itemRef);

              const name = itemRef.name;

              function truncateText(name) {
                const words = name.split('');
                const truncatedWords = words.slice(0, 25);
                return truncatedWords.join('') + '...';
              }

              setCreationCards(prevCreationCards => [
                ...prevCreationCards,
                <FolderCard
                  key={(Date.now() + Math.random()).toString()}
                  toolName={truncateText(name)}
                  fileUrl={downloadURL}
                  timeCreated={fileObject.timeCreated}
                  // If the fileMetaData.contentType is a pdf, then set the type to 'pdf', if the fileMetaData.contentType is 'application/vnd.openxmlformats-officedocument.presentationml.presentation', then set the type to 'ppt'
                  type={
                    fileMetaData.contentType === 'application/pdf'
                      ? 'pdf'
                      : 'ppt'
                  }
                />,
              ]);
            });
          })
          .catch(error => {
            console.log("Couldn't get files");
          });
      });

      setDataLoaded(true);
    });
  }, []);

  const sortedCreationCards = creationCards.sort((a, b) => {
    // Get the timeCreated value for each FolderCard component
    const timeCreatedA = a.props.timeCreated;
    const timeCreatedB = b.props.timeCreated;

    // Convert the timeCreated values to Date objects
    const dateA = new Date(timeCreatedA);
    const dateB = new Date(timeCreatedB);

    // Compare the dates and return -1, 0, or 1 depending on which date is earlier
    if (dateA < dateB) return 1;
    if (dateA > dateB) return -1;
    return 0;
  });

  // eslint-disable
  return (
    <div className="creations">
      <div className="pageheader">
        <div>{<ImHistory className="historyicon" />} Creation History</div>
        <a target="_blank" href="https://educationcopilot.com/requests/">
          <div className="request">
            {<ImPlus className="historyicon plusicon" />} Request a New Tool
          </div>
        </a>
      </div>
      <Wrapper>
        <h5 className="folder-header">Folders</h5>
        <div className="archives">
          {/* <Link to="/creations/recipes">
            <FolderCard
              className="creation-card"
              key="recipes"
              toolName={`Recipes`}
              toolLink={`creations/recipes`}
              type="folder"
            />
          </Link> */}
          <Link to="/creations/lesson-plans">
            <FolderCard
              className="creation-card"
              key="lessonplans"
              toolName={`Lesson Plans`}
              type="folder"
            />
          </Link>
          <Link to="/creations/powerpoints">
            <FolderCard
              className="creation-card"
              key="powerpoints"
              toolName={`PowerPoint Presentations`}
              type="folder"
            />
          </Link>
          <Link to="/creations/educational-handouts">
            <FolderCard
              className="creation-card"
              key="Education Handouts"
              toolName={`Educational Handouts`}
              toolLink={`creations/educational-handouts`}
              type="folder"
            />
          </Link>
          <Link to="/creations/context-builders">
            <FolderCard
              className="creation-card"
              key="contextbuilders"
              toolName={`Context Builders`}
              type="folder"
            ></FolderCard>
          </Link>
          {/* <FolderCard
            className="creation-card"
            key="researchprojects"
            toolName={`Research Projects`}
            toolLink={`creations/researchprojects`}
            type="folder"
          /> */}
          <Link to="/creations/writing-prompts">
            <FolderCard
              className="writing-prompts"
              key="writingprompts"
              toolName={`Writing Prompts`}
              type="folder"
            ></FolderCard>
          </Link>
        </div>
        <div className="recentFiles">
          <h5 className="folder-header creations-header">Recent Creations</h5>
          <div className="files">{sortedCreationCards}</div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Creations;
