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

    addImageWithTags(doc, newArray, url){
        var tags = [];
        for (var label in doc.data().labels) {
            tags.push({value: doc.data().labels[label].description, title: doc.data().labels[label].description});
        }
        newArray.push({src: url,thumbnail: url,thumbnailWidth: 320, thumbnailHeight: 212, tags: tags});
    }

    componentDidMount(){
        var newArray = this.state.images.slice();
        var imageRef = database.collection('images');
        imageRef.get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    storage.ref().child(doc.data().name).getDownloadURL().then(url => {
                        this.addImageWithTags(doc, newArray, url);
                    });
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
        this.getData(newArray);
    }

    insertImage(image){
        var imageRef = database.collection('images');
        var doc = imageRef.where('name', '==',image.name).limit(1)
        doc.onSnapshot(docSnapshot => {
            docSnapshot.docs.forEach(elem => {
                    storage.ref().child(image.name).getDownloadURL().then(url => {
                        this.setState({url})
                        var newArray = this.state.images.slice();
                        this.addImageWithTags(elem, newArray, url);
                        this.setState({images:newArray});
                    });
                }
            );
        });
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
