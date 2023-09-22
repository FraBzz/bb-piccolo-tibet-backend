import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";

export type props = {
    handleOpen: () => void,
    handleDelete: () => void,
    open: boolean,
    id: string,
    title: string
}

export function DialogCustom(data: props) {

    return (
        <Dialog open={data.open} handler={data.handleOpen}>
        <DialogHeader>Eliminazione dell'evento "{data.title}"</DialogHeader>
        <DialogBody divider>
          Sei sicuro di volere eliminare definitivamente l'evento "{data.title}"?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={data.handleOpen}
            className="mr-1"
          >
            <span>Chiudi</span>
          </Button>
          <Button variant="gradient" color="green" onClick={data.handleDelete}>
            <span>Elimina</span>
          </Button>
        </DialogFooter>
      </Dialog>
    )
}

