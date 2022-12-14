import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ImFolder } from 'react-icons/im';
import './FolderCard.css';
import pdfIcon from '../assets/svg/noun-pdf.svg';
import pptIcon from '../assets/svg/noun-ppt.svg';

const actionButtons = (
  <div className="action-buttons">
    <div
      className="action-button"
      onClick={() => console.log('Downloading file...')}
    >
      Download
    </div>
    <div
      className="action-button"
      onClick={() => console.log('Deleting file...')}
    >
      Delete
    </div>
  </div>
);

const FileCard = ({ _id, toolName, lastName, fileUrl, type }) => {
  return (
    <Card className="folder-card">
      <CardContent>
        <div className="folder-card-content">
          {type === 'ppt' && (
            <img src={pptIcon} alt="bed" className="pdfIcon" />
          )}
          {type === 'pdf' && (
            <img src={pdfIcon} alt="bed" className="pdfIcon" />
          )}
          {type === 'folder' && <ImFolder className="folder-icon" />}

          <div className="folder-card-title">{toolName}</div>
          {actionButtons}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileCard;
