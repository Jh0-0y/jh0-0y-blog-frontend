import { useState } from 'react';
import styles from './CodeBlockLanguageSelector.module.css';

interface CodeBlockLanguageSelectorProps {
  onSelect: (language: string) => void;
  onClose: () => void;
}

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'sql', label: 'SQL' },
  { value: 'bash', label: 'Bash' },
  { value: 'json', label: 'JSON' },
  { value: 'yaml', label: 'YAML' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'plaintext', label: 'Plain Text' },
];

const CodeBlockLanguageSelector = ({
  onSelect,
  onClose,
}: CodeBlockLanguageSelectorProps) => {
  const [search, setSearch] = useState('');

  const filteredLanguages = LANGUAGES.filter((lang) =>
    lang.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>언어 선택</h3>
        <input
          type="text"
          placeholder="언어 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
          autoFocus
        />
        <div className={styles.languageList}>
          {filteredLanguages.map((lang) => (
            <button
              key={lang.value}
              onClick={() => onSelect(lang.value)}
              className={styles.languageButton}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeBlockLanguageSelector;
