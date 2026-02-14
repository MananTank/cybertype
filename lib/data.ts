// All typing data bundled for client-side access (no fetching required)
import quotes from '../public/json/quotes.json'
import english200 from '../public/json/english-200.json'
import english1k from '../public/json/english-1k.json'
import english5k from '../public/json/english-5k.json'
import english10k from '../public/json/english-10k.json'
import wordle from '../public/json/wordle.json'
import commonlyMisspelled from '../public/json/commonly-misspelled.json'
import javascript from '../public/json/javascript.json'
import rust from '../public/json/rust.json'
import html from '../public/json/html.json'
import css from '../public/json/css.json'
import cpp from '../public/json/c++.json'
import sql from '../public/json/sql.json'
import git from '../public/json/git.json'
import bash from '../public/json/bash.json'
import python from '../public/json/python.json'
import java from '../public/json/java.json'
import csharp from '../public/json/csharp.json'

// Map data names to their data arrays
export const allData: Record<string, unknown[]> = {
  Quotes: quotes,
  'English 200': english200,
  'English 1K': english1k,
  'English 5K': english5k,
  'English 10K': english10k,
  Wordle: wordle,
  'Commonly Misspelled': commonlyMisspelled,
  JavaScript: javascript,
  Rust: rust,
  HTML: html,
  CSS: css,
  'C++': cpp,
  SQL: sql,
  Git: git,
  Bash: bash,
  Python: python,
  Java: java,
  'C#': csharp
}
