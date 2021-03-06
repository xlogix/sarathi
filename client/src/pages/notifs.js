import React, {Component} from 'react'
import axios from 'axios'
import {List, Grid, ListItem, Avatar, Typography, Divider} from '@material-ui/core'
import moment from 'moment'
import FullScreenDialog from '../displays/FullScreenDialog'
import EmptyMessage from '../displays/emptyMessage'
import Footer from '../displays/footer';

export default class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            contentSectionMargin: 0,
            contentSectionHeight: 0,
            contentSectionWidth: 0,
            showFullScreenDialog: false,
            dialogGroup: undefined,
        };
        this.updateContentSectionDimensions = this.updateContentSectionDimensions.bind(this);
    }

    componentDidMount() {
        axios.get('/api/user/notifications')
        .then((res) => {
            this.setState({notifications: res.data.reverse()});
        })
        .catch(err => console.log(err));
        this.updateContentSectionDimensions();
        window.addEventListener('resize', this.updateContentSectionDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateContentSectionHeight);
    }

    updateContentSectionDimensions() {
        const width = window.innerWidth < 500 ? window.innerWidth : 500;
        const appBarHeight = document.getElementById('appBar').clientHeight;
        const footerHeight = document.getElementById('footer').clientHeight;
        this.setState({
            contentSectionHeight: window.innerHeight - appBarHeight - footerHeight, 
            contentSectionWidth: width,
            contentSectionMargin: appBarHeight
        });
    }

    handleNotifClick(notifId, groupId, index) {
        this.openFullScreenDialog();
        // get group info from the notification object 
        axios.get('/api/group/' + groupId)
        .then(res => {
            console.log(res.data);
            this.setState({showFullScreenDialog: true, dialogGroup: res.data});

            //change read status of notification object in the database
            axios.post('/api/notification/read_notif', {
                notifId: notifId,
            })
            .then(res => {
                // change the read status of the notif object
                var newArray = [...this.state.notifications];
                newArray[index].read = true;
                this.setState({notifications: newArray});
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }

    openFullScreenDialog = () => {
        this.setState({showFullScreenDialog: true});
    }

    closeFullScreenDialog = () => {
        this.setState({showFullScreenDialog: false});
    }

    render() {
        return (
            <div style={{marginTop: this.state.contentSectionMargin}}>
            <List style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div>
            {this.state.notifications.length ?
                this.state.notifications.map((item, index) =>
                <div style={{width: this.state.contentSectionWidth}}>
                    <ListItem 
                    button={!item.read}
                    alignItems="flex-start" 
                    onClick={() => this.handleNotifClick(item._id, item.object_id, index)} 
                    style={item.read ? {backgroundColor: '#efefef'} : {}}>
                        <Grid container spacing={2}>
                            <Grid item style={{display: 'flex', alignItems: 'center'}}>
                                <Avatar 
                                alt='Arib Alam' 
                                src={'https://graph.facebook.com/' + item.subject.fb_id + '/picture?type=square'}
                                style={{height: 60, width: 60}} />
                            </Grid>
                            <Grid item xs style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <Typography variant='body1'>{item.message}</Typography>
                                <Typography variant='caption'>{moment(item.created_on).fromNow()}</Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <Divider />
                </div>
                )
            :
                <EmptyMessage primary='No Notifications' />
            }
            </div>
            </List>
            <FullScreenDialog 
            open={this.state.showFullScreenDialog} 
            onClose={this.closeFullScreenDialog}
            group={this.state.dialogGroup} />
            <Footer />
            </div>
        );
    }
}