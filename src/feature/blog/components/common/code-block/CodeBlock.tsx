// import { useCallback, useState, useEffect } from 'react';
// import Prism from 'prismjs';
// import 'prismjs/components/prism-javascript';
// import 'prismjs/components/prism-typescript';
// import 'prismjs/components/prism-java';
// import 'prismjs/components/prism-python';
// import 'prismjs/components/prism-c';
// import 'prismjs/components/prism-cpp';
// import 'prismjs/components/prism-csharp';
// import 'prismjs/components/prism-bash';
// import 'prismjs/components/prism-powershell';
// import 'prismjs/components/prism-json';
// import 'prismjs/components/prism-xml-doc';
// import 'prismjs/components/prism-markup';
// import 'prismjs/components/prism-css';
// import 'prismjs/components/prism-sql';
// import 'prismjs/components/prism-yaml';
// import 'prismjs/components/prism-markdown';
// import styles from './CodeBlock.module.css';

// interface CodeBlockProps {
//   code: string;
//   language?: string;
//   editable?: false; // 뷰어용은 항상 false
// }

// export const CodeBlock = ({ 
//   code, 
//   language = 'javascript',
//   editable = false 
// }: CodeBlockProps) => {
//   const [copied, setCopied] = useState(false);

//   // 코드 복사
//   const handleCopy = useCallback(async () => {
//     try {
//       await navigator.clipboard.writeText(code);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.error('복사 실패:', err);
//     }
//   }, [code]);

//   // Prism 하이라이팅 적용
//   useEffect(() => {
//     Prism.highlightAll();
//   }, [code, language]);

//   return (
//     <div className={styles.codeBlockWrapper}>
//       <div className={styles.codeBlock}>
//         {/* 맥 스타일 헤더 */}
//         <div className={styles.header}>
//           <div className={styles.windowButtons}>
//             <span className={styles.btnClose} />
//             <span className={styles.btnMinimize} />
//             <span className={styles.btnMaximize} />
//           </div>

//           <span className={styles.languageLabel}>{language}</span>

//           <button
//             type="button"
//             className={styles.copyButton}
//             onClick={handleCopy}
//           >
//             {copied ? (
//               <>
//                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <polyline points="20 6 9 17 4 12" />
//                 </svg>
//                 복사됨
//               </>
//             ) : (
//               <>
//                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
//                   <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
//                 </svg>
//                 복사
//               </>
//             )}
//           </button>
//         </div>

//         {/* 코드 영역 */}
//         <pre className={`${styles.pre} language-${language}`}>
//           <code className={`language-${language}`}>{code}</code>
//         </pre>
//       </div>
//     </div>
//   );
// };