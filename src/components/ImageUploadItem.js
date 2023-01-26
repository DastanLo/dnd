import React from 'react';
import {useDrag, useDrop} from 'react-dnd'

const ImageUploadItem = ({preview, handleImageUpload, index, bigSize, moveImage}) => {
    const ref = React.useRef(null);
    const [{opacity}, drag] = useDrag(
        () => ({
            type: 'card',
            item: {index: index},
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.5 : 1
            })
        }),
        []
    );

    const [_,drop] = useDrop({
        accept: 'card',
        item: {index: index},
        drop: (item) => {
            moveImage(item.index, index);
        },
    });

    drag(drop(ref));
    return (
        <div style={{opacity: opacity}} ref={ref} className="image-item">
            <input onChange={handleImageUpload} type="file" hidden id={'image-upload' + index}/>
            <label style={{
                width: bigSize ? 202 : 101,
                height: bigSize ? 160 : 80,
                display: 'block',
            }} className="image-card" htmlFor={'image-upload' + index}>
                {preview && <img style={{
                    width: '100%',
                    height: '100%',
                }} src={preview} alt="preview"/>}
            </label>
        </div>
    );
};

export default ImageUploadItem;
