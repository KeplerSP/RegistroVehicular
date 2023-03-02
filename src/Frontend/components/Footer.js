import React from 'react';
import GitHub from '../img/github_icon.svg';
import GitHubPages from '../img/github-pages_icon.svg';
import Linkedin from '../img/linkedin_icon.svg';

export default function Footer() {
  return (
    <footer className='text-center text-lg-start text-muted'>
      <hr width="100%" color="white" />
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Contacto:</span>
        </div>
        <div>
          <a target="_blank" href='https://keplersp.github.io/' className='me-4 text-reset'>
            <img src={GitHubPages} width="30" height="30" />
          </a>
          <a target="_blank" href='https://github.com/KeplerSP' className='me-4 text-reset'>
            <img src={GitHub} width="30" height="30" />
          </a>
          <a target="_blank" href='' className='me-4 text-reset'>
            <img src={Linkedin} width="35" height="35" />
          </a>
        </div>
      </section>
      <div className='text-center p-4 text-white' >
        © 2023 Copyright
      </div>
    </footer>
  );
}