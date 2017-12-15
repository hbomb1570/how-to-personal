import React, { Component } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube'
import { Card, CardHeader, CardMedia } from 'material-ui/Card';
import './Videos.css'

export default class Videos extends Component {
    constructor() {
        super()
        this.state = {
            videos: [],
            expanded: false,
            expandedCard: undefined
        }
    }
    componentDidMount() {
        axios.get('/api/videos')
            .then(res => {
                this.setState({
                    videos: res.data,
                })
            })
    }
    render() {
        const videosName = this.state.videos.map((e, i, a) => {
            return (
                <Card className='vidCard' key={i} expanded={this.state.expandedCard === i ? true : false} onClick={() => {
                    if (this.state.expandedCard === i) {
                        this.setState({
                            expandedCard: undefined
                        })
                    }
                    else {
                        this.setState({
                            expandedCard: i
                        })
                    }
                }}>
                    <CardHeader className='vidName'
                        title={e.video_name}
                    />
                    <CardMedia >
                        <YouTube className='howTo' videoId={e.url} autoPlay='false' controls />
                    </CardMedia>
                </Card>
            )
        })
        return (
            <div className='vidWrapper'>
                {videosName}
            </div>
        );
    }
}