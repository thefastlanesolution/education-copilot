import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ImFolder } from 'react-icons/im';
import './FolderCard.css';
import pdfIcon from '../assets/svg/noun-pdf.svg';
import pptIcon from '../assets/svg/noun-ppt.svg';
import { Document, Page } from 'react-pdf';

const FolderCard = ({ _id, toolName, lastName, fileUrl, type }) => {
  return (
    <a href={fileUrl} target="_blank" className="linkEffects">
      <div className="preview-card">
        {/* If the file is a pdf, render the pdf preview */}
        {type === 'pdf' && (
          <Document
            className="pdf-document"
            file={fileUrl}
            error={
              <div>
                {' '}
                <img src={pdfIcon} alt="bed" className="pdfIconBig" />
              </div>
            }
            loading={
              <div>
                {' '}
                <img src={pdfIcon} alt="bed" className="pdfIconBig" />
              </div>
            }
          >
            <Page className="pdf-page" scale={0.5} pageNumber={1} />
          </Document>
        )}

        {/* If the file is a ppt, render the ppt icon in white box */}
        {type === 'ppt' && (
          <div className="ppt-box">
            <img src={pptIcon} alt="bed" className="pptIconBig" />
          </div>
        )}

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
            </div>
          </CardContent>
        </Card>
      </div>
    </a>
  );
};

export default FolderCard;
