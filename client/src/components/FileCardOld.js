import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ImFolder } from 'react-icons/im';

const FileCard = ({ _id, toolName, lastName, fileUrl }) => {
  //  Styled CSS to add 10px of padding to top of pdfRender div

  return (
    <a href={fileUrl} target="_blank">
      <Card
        sx={{
          width: '100%',
          maxWidth: '100%',
          border: 'none',
          boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.15)',
          borderRadius: '5px',
          height: '100%',
          '&:hover': {
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
          },
        }}
      >
        <CardContent>
          <div
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              variant="h5"
              component="div"
              style={{
                textAlign: 'center',
                fontWeight: '500',
                fontSize: '16px',
                fontFamily: 'inter',
              }}
            >
              <div className="pdfRender">{lastName}</div>
              {toolName}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </a>
  );
};

export default FileCard;
