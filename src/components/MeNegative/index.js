import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent'
import Divider from "@material-ui/core/Divider";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CustomTextField from '../CustomTextField'
import AddIcon from '@material-ui/icons/Add';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DateFnsUtils from "@date-io/date-fns"; // import
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import { useMutation } from '@apollo/react-hooks';
import { CREATE_PROFILE } from "../Queries";
import { format } from 'date-fns'
import PageLoading from '../Loading'
import PageError from '../Error'

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 800,
        textAlign: "center",
        overflow: "hidden",
        color: "#ffffff",
        backgroundColor: "transparent",
    },
    bigAvatar: {
        width: 200,
        height: 200,
    },
    imgender: {
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    margin: {
        margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    expand: {
        color: "#ffffff",
        backgroundColor: "#003459",
        overflowX: "hidden",
    }
}));

const INIT_STATE = {
    address: "",
    info: "",
    gender: "",
    avatar: "",
    school: "",
    career: "",
    hobby: "",
    birthdate: ""
}

export default function PgenderMeNegative() {
    const [createProfile] = useMutation(CREATE_PROFILE);
    const [values, setValues] = React.useState(INIT_STATE)
    const [gender, setGender] = React.useState('');
    const [open, setOpen] = React.useState(false)
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = event => {
        setValues((previousValues) => ({
            ...previousValues, [event.target.name]: event.target.value
        }))
    };
    const handleDateChange = date => {
        setSelectedDate(date);
    };

    const handleSelectChange = e => {
        setGender(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let address = values.address
        let info = values.info
        let avatar = values.avatar
        let school = values.school
        let career = values.career
        let hobby = values.hobby
        let birthdate = format(new Date(selectedDate), 'MM-dd-yyyy')
        let author = localStorage.getItem('id')
        const gosave = await createProfile({
            variables: { address, info, gender, avatar, school, career, hobby, birthdate, author }
        })

        if (gosave.loading) return <PageLoading />
        if (gosave.error) return <PageError />
        // if (gosave.data) return <PageMePositive data={gosave.data} />

        setOpen(false);

    }
    return (
        <Card className={classes.card}>

            <CardActionArea>
                <CardContent>
                    <div className={classes.imgender}>
                        <Avatar alt="Unknown" src="https://img.pngio.com/question-mark-png-5a381257a892436425987715136241516905-1-savory-png-for-question-mark-900_1020.jpg" className={classes.bigAvatar} />
                    </div>

                    <Typography
                        className={"MuiTypography--heading"}
                        variant={"h6"}
                        gutterBottom
                    >
                        Not Found!
                    </Typography>
                    <Typography
                        className={"MuiTypography--subheading"}
                        variant={"caption"}
                    >
                        Seem like you dont have a profile and information to display here yet! . Please Create one
             </Typography>

                    <Typography
                        className={"MuiTypography--subheading"}
                        variant={"caption"}
                    >
                        His Status: "nothing"
            </Typography>
                    <Divider className={classes.margin} light />
                    <Fab size="small" color="secondary" aria-label="update" className={classes.margin} onClick={handleClickOpen}>
                        <AddIcon />
                    </Fab>
                </CardContent>
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                    PaperProps={{
                        classes: {
                            root: classes.expand
                        }
                    }}
                >
                    <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
                    <DialogContent>

                        <CustomTextField
                            onChange={handleChange}
                            value={values.address}
                            autoFocus
                            margin="dense"
                            id="address"
                            name="address"
                            label="Address"
                            type="text"
                            fullWidth
                        />

                        <CustomTextField
                            onChange={handleChange}
                            value={values.info}
                            autoFocus
                            margin="dense"
                            id="info"
                            name="info"
                            label="Your Bio/ Status"
                            type="text"
                            fullWidth
                        />

                        <FormControl className={classes.formControl} fullWidth>
                            <InputLabel htmlFor="gender-native-simple">Gender</InputLabel>
                            <Select
                                native
                                value={gender}
                                onChange={handleSelectChange}
                                inputProps={{
                                    name: 'gender',
                                    id: 'gender-native-simple',
                                }}
                            >
                                <option value="" />
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </Select>
                        </FormControl>

                        <CustomTextField
                            onChange={handleChange}
                            value={values.avatar}
                            autoFocus
                            margin="dense"
                            id="avatar"
                            name="avatar"
                            label="Avatar Link"
                            type="text"
                            fullWidth
                        />

                        <CustomTextField
                            onChange={handleChange}
                            value={values.school}
                            autoFocus
                            margin="dense"
                            id="school"
                            name="school"
                            label="Graduated from"
                            type="text"
                            fullWidth
                        />

                        <CustomTextField
                            onChange={handleChange}
                            value={values.career}
                            autoFocus
                            margin="dense"
                            id="career"
                            name="career"
                            label="Career"
                            type="text"
                            fullWidth
                        />


                        <CustomTextField
                            onChange={handleChange}
                            value={values.hobby}
                            autoFocus
                            margin="dense"
                            id="hobby"
                            name="hobby"
                            label="Hobby"
                            type="text"
                            fullWidth
                        />

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker value={selectedDate} onChange={handleDateChange} />
                        </MuiPickersUtilsProvider>



                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus color="primary" onClick={handleSubmit}>
                            SAVE
                  </Button>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            CANCEL
                  </Button>
                    </DialogActions>
                </Dialog>
            </CardActionArea>
        </Card>
    );
}