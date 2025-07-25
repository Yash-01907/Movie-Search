import React from 'react';

const Footer = () => {
  const githubUrl = 'https://github.com/yash-01907/';

  return (
    <footer style={{ textAlign: 'center', padding: '10px', marginTop: '20px', borderTop: '1px solid #eaeaea' }} className='text-white flex flex-row justify-center gap-5'>
      <p>
        © {new Date().getFullYear()} - Created by Yash
      </p>
      <a href={githubUrl} target="_blank" rel="noopener noreferrer">
        Find me on GitHub
      </a>
    </footer>
  );
};

export default Footer;