import { NodeViewWrapper } from '@tiptap/react';
import { useState } from 'react';
import type { NodeViewProps } from '@tiptap/react';
import type { ImageNodeAttrs } from '../types';
import ImageModal from '../base/ImageModal';
import styles from './ImageNode.module.css';

const ImageNode = ({ node }: NodeViewProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const attrs = node.attrs as ImageNodeAttrs;

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <NodeViewWrapper className={styles.wrapper}>
      <div className={styles.container}>
        <img
          src={attrs.url}
          alt={attrs.alt || attrs.fileName}
          className={styles.image}
          onClick={handleClick}
          loading="lazy"
        />
        <div className={styles.caption}>{attrs.fileName}</div>
      </div>

      {isModalOpen && (
        <ImageModal
          url={attrs.url}
          alt={attrs.alt || attrs.fileName}
          onClose={handleCloseModal}
        />
      )}
    </NodeViewWrapper>
  );
};

export default ImageNode;
