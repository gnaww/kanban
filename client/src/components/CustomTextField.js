import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
    cssLabel: {
        '&$cssFocused': {
            color: "#00695f",
        },
    },
    cssLabelDark: {
        '&$cssFocused': {
            color: "white",
        },
        color: "white"
    },
    cssFocused: {},
    cssUnderline: {
        '&:after': {
            borderBottomColor: "#00695f",
        }
    },
    cssUnderlineDark: {
        '&:after': {
            borderBottomColor: "white",
        },
    },
    cssInputDark: {
        color: "white"
    }
});

const CustomTextField = props => {
    const { classes, newBoardName, handleBoardNameChange, formType, nightmode } = props;

    if (formType === "board") {
        return (
            <FormControl>
                <InputLabel
                    htmlFor="new-board"
                    classes={ 
                    nightmode ? 
                    {
                        root: classes.cssLabelDark,
                        focused: classes.cssFocused,
                    }
                    : 
                    {
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                    }}
                >
                    New board name
                </InputLabel>
                <Input
                    id="new-board"
                    classes={
                    nightmode ?
                    {
                        root: classes.cssInputDark,
                        underline: classes.cssUnderlineDark,
                    }
                    :
                    {
                        underline: classes.cssUnderline,
                    }}
                    value={newBoardName}
                    onChange={handleBoardNameChange}
                />
            </FormControl>
        );
    }
    else if (formType === "item") {
        return (
            <FormControl>
                <InputLabel
                    htmlFor="new-board"
                    classes={ 
                    nightmode ? 
                    {
                        root: classes.cssLabelDark,
                        focused: classes.cssFocused,
                    }
                    : 
                    {
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                    }}
                >
                    Add new item
                </InputLabel>
                <Input
                    id="new-board"
                    classes={
                    nightmode ?
                    {
                        root: classes.cssInputDark,
                        underline: classes.cssUnderlineDark,
                    }
                    :
                    {
                        underline: classes.cssUnderline,
                    }}
                    value={newBoardName}
                    onChange={handleBoardNameChange}
                />
            </FormControl>
        );
    }
}

export default withStyles(styles)(CustomTextField);