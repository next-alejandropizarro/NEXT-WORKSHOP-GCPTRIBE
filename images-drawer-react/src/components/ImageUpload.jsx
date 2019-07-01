import React, {Component} from 'react';
import {storage} from '../firebase';
import {database} from '../firebase';
import ImageUploader from 'react-images-upload';

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            images: [],
            url: ''
        }
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(picture) {
        const image = picture[Object.keys(picture).length - 1];
        this.setState(() => ({image}));
        //const uploadTask = TO DO
    }

    render() {
        const style = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        };
        return (
            <React.Fragment>
                <div style={style}>
                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.jpeg']}
                        maxFileSize={5242880}
                    />
                </div>
            </React.Fragment>
        )
    }
}
export default ImageUpload;
