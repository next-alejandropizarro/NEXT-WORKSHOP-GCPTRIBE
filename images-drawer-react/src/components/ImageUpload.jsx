import React, {Component} from 'react';
import {storage} from '../firebase';
import {database} from '../firebase';
import Gallery from 'react-grid-gallery';
import ImageUploader from 'react-images-upload';

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            images: [],
            url: '',
            progress: 0
        }
        this.onDrop = this.onDrop.bind(this);
    }

    getData(newArray){
        setTimeout(() => {
            this.setState({
                images: newArray
            })
        }, 10000)
    }

    componentDidMount(){
        var newArray = this.state.images.slice();
        var imageRef = //TO DO
        // Iterate for each document and tags to push on newArray for show the images

        this.getData(newArray);
    }

    insertImage(image){

        //var imageRef = // TO DO
        //var doc = // TO DO
    }

    onDrop(picture) {
        const image = picture[Object.keys(picture).length - 1];
        this.setState(() => ({image}));
        const uploadTask = storage.ref(`${image.name}`).put(image);
        uploadTask.on('state_changed',
            (snapshot) => {
                // progrss function ....
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({progress});
            },
            (error) => {
                // error function ....
                console.log(error);
            },
            () => {
                // complete function ....
                this.setState({image});
                this.insertImage(image)
            });
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
                    <br/>
                    <progress value={this.state.progress} max="100"/>
                    <br/>
                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.jpeg']}
                        maxFileSize={5242880}
                    />
                </div>
                <div id="example-0" className="center">
                    <Gallery images={this.state.images} />
                </div>
            </React.Fragment>
        )
    }
}
export default ImageUpload;
