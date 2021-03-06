import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

interface ModalProps {
  title: string;
  content: string;
  buttonName: string;
  isOpen: boolean;
  handleClose: () => void;
}

export default function ResponsiveDialog(props: ModalProps) {
  const { title, content, buttonName, isOpen, handleClose } = props;

  const [open, setOpen] = React.useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            {buttonName}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
