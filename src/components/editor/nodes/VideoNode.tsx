import { NodeViewWrapper } from '@tiptap/react';
import type { NodeViewProps } from '@tiptap/react';
import type { VideoNodeAttrs } from '../types';
import styles from './VideoNode.module.css';

const VideoNode = ({ node }: NodeViewProps) => {
  const attrs = node.attrs as VideoNodeAttrs;

  return (
    <NodeViewWrapper className={styles.wrapper}>
      <div className={styles.container}>
        <video
          src={attrs.url}
          controls
          controlsList="nodownload"
          className={styles.video}
        >
          <track kind="captions" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.caption}>{attrs.fileName}</div>
      </div>
    </NodeViewWrapper>
  );
};

export default VideoNode;
