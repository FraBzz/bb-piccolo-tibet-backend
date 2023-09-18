import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
  } from "@material-tailwind/react";

  export type listElement = {
title: string,
description: string,
key: string
  }
   
  export function ListWithAvatar({title, description, key}: listElement) {
    console.log({title})
    return (
      <Card className="w-96 md:w-2/3 lg:w-3/4 xl:w-4/5" key={key}>
        <List>
          <ListItem className="mb-4">
            <ListItemPrefix>
              <Avatar variant="circular" alt="candice" src="/img/face-1.jpg" />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                {title}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {description}
              </Typography>
            </div>
          </ListItem>
          {/* <ListItem>
            <ListItemPrefix>
              <Avatar variant="circular" alt="alexander" src="/img/face-2.jpg" />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                Alexander
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                Backend Developer @ Material Tailwind
              </Typography>
            </div>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <Avatar variant="circular" alt="emma" src="/img/face-3.jpg" />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                Emma Willever
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                UI/UX Designer @ Material Tailwind
              </Typography>
            </div>
          </ListItem> */}
        </List>
      </Card>
    );
  }