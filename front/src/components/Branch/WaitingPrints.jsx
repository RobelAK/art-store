import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Card, CardContent, Grid } from '@mui/material';

const WaitingPrints = () => {
  // Sample array of items
  const accordionData = [
    {
      id: 1,
      title: 'buyers tex-ref',
      items: [
        { id: 1, text: 'Item 1' },
        { id: 2, text: 'Item 2' },
        { id: 3, text: 'Item 3' },
      ],
    },
    {
      id: 2,
      title: 'Buyers tex-ref',
      items: [
        { id: 4, text: 'Item 4' },
        { id: 5, text: 'Item 5' },
        { id: 6, text: 'Item 6' },
      ],
    },
  ];

  return (
    <Container>
      <Container sx={{ height: '100px',  }}></Container>
      <Typography variant="h5" color={'GrayText'} component="div" gutterBottom fontFamily="sora,sans-serif" textAlign="center">
        Waiting Prints
      </Typography>
      {accordionData.map(accordion => (
        <Card key={accordion.id} style={{ marginBottom: '20px' }}>
          <CardContent>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${accordion.id}-content`}
                id={`panel${accordion.id}-header`}
              >
                <Typography variant="h6" marginRight='25px' >Buyers name </Typography>
                <Typography variant="h6">{accordion.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  {accordion.items.map(item => (
                    <Card key={item.id} style={{ marginBottom: '10px' }}>
                      <CardContent>
                        <Typography sx={{marginRight:'5px'}} variant="subtitle1">Title: {item.text}</Typography>
                        <Typography sx={{marginRight:'5px'}} variant="subtitle1">size:</Typography>
                        <Typography sx={{marginRight:'5px'}}  variant="subtitle1">Quantity:</Typography>
                        
                        <Container>
                        <Button sx={{margin:'10px'}} variant="contained" color="primary">
                          print
                        </Button>
                        <Button sx={{margin:'10px'}} variant="outlined" color="primary">
                          View
                        </Button>
                        </Container>
                        
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default WaitingPrints;
