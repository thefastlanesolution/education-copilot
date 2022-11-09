import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { useAppContext } from '../context/appContext';
import { Link } from 'react-router-dom';

const Tool = ({ _id, firstName, lastName, studentEmail }) => {
  const { setEditStudent, deleteStudent } = useAppContext();

  return (
    <Link to={`/${lastName}`}>
      <Card
        sx={{
          width: '100%',
          maxWidth: '100%',
          border: 'none',
          boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.15)',
          borderRadius: '10px',
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
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <article>
                <AutoFixHighIcon
                  sx={{
                    fontSize: '2.5rem',
                    color: '#fff',
                    backgroundColor: '#7d5ff5',
                    borderRadius: '50%',
                    width: '2.5rem',
                    height: '2.5rem',
                    padding: '0.5rem',
                    margin: '10px 0 10px 0',
                  }}
                />
              </article>
              <Typography variant="h5" component="div">
                {firstName}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
              <Typography variant="body2">{studentEmail}</Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Tool;
