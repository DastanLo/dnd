import './App.css';
import ImageUploadItem from "./components/ImageUploadItem";
import {useState} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

const initialImages = [
    'https://media.istockphoto.com/id/1175387759/vector/camera-icon.jpg?s=612x612&w=0&k=20&c=paC1ZkU31dH2B5epXqT_cYOyca5uqh4v0WpFUldCUBE=',
    'https://media.istockphoto.com/id/1175387759/vector/camera-icon.jpg?s=612x612&w=0&k=20&c=paC1ZkU31dH2B5epXqT_cYOyca5uqh4v0WpFUldCUBE=',
    'https://media.istockphoto.com/id/1175387759/vector/camera-icon.jpg?s=612x612&w=0&k=20&c=paC1ZkU31dH2B5epXqT_cYOyca5uqh4v0WpFUldCUBE=',
    'https://media.istockphoto.com/id/1175387759/vector/camera-icon.jpg?s=612x612&w=0&k=20&c=paC1ZkU31dH2B5epXqT_cYOyca5uqh4v0WpFUldCUBE=',
    'https://media.istockphoto.com/id/1175387759/vector/camera-icon.jpg?s=612x612&w=0&k=20&c=paC1ZkU31dH2B5epXqT_cYOyca5uqh4v0WpFUldCUBE=',
    'https://media.istockphoto.com/id/1175387759/vector/camera-icon.jpg?s=612x612&w=0&k=20&c=paC1ZkU31dH2B5epXqT_cYOyca5uqh4v0WpFUldCUBE=',
    'https://media.istockphoto.com/id/1175387759/vector/camera-icon.jpg?s=612x612&w=0&k=20&c=paC1ZkU31dH2B5epXqT_cYOyca5uqh4v0WpFUldCUBE=',
];

function App() {
    const [images, setImages] = useState(initialImages);

    const handleImageUpload = (e, i) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const newImages = [...images];
            newImages[i] = reader.result;
            setImages(newImages);
        };
    };

    const moveImage = (dragIndex, dropIndex) => {
        const newImages = [...images];
        const dragImage = newImages[dragIndex];
        const dropImage = newImages[dropIndex];
        newImages.splice(dragIndex, 1,dropImage);
        newImages.splice(dropIndex, 1, dragImage);
        setImages(newImages);
    };
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="container">
                {
                    images.map((image, index) => {
                        return <ImageUploadItem moveImage={moveImage}  bigSize={index === 0} index={index}
                                                handleImageUpload={(e) => handleImageUpload(e, index)} key={index}
                                                preview={image}/>
                    })
                }
            </div>
        </DndProvider>
    );
}

export default App;
