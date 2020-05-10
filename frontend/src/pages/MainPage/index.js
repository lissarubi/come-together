import React from 'react';
import './styles.css';
import GitHubButton from 'react-github-btn';

import titlegif from '../../assets/titlegif.gif';

export default function Logon() {
  return (
    <div className="mainpage-conteiner">
      <main>
        <div className="titleBox">
          <h1>Come Together</h1>
          <h2>Upload or Download all your packages in one command.</h2>
          <GitHubButton
            href="https://github.com/edersonferreira/come-together/subscription"
            data-size="large"
            data-icon="octicon-eye"
            aria-label="Watch edersonferreira/come-together on GitHub"
          >
            Watch
          </GitHubButton>
          <span> </span>
          <GitHubButton
            href="https://github.com/edersonferreira/come-together"
            data-size="large"
            data-icon="octicon-star"
            aria-label="Star edersonferreira/come-together on GitHub"
          >
            Star
          </GitHubButton>
          <img src={titlegif} className="gifImg" alt="" />
        </div>
        <div className="usage">
          <h1>Usage</h1>
          <p>
            <code>ct go</code>: send ALL your packages to Come Together.
          </p>
          <br />
          <p>
            <code>ct come</code>: get ALL your packages from Come Together and
            install in your system.
          </p>
        </div>
        <footer>
          This is only a Github Project, the Come Together does not exist in
          real life, but in programming world yes :)
        </footer>
      </main>
    </div>
  );
}
