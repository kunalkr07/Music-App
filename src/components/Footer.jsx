import React from 'react'

export default function Footer() {
  return (
    <div>
        {/* footer */}
        <footer className="music-footer">
          <div className="footer-content">
            {/* About Section */}
            <div className="footer-section about">
              <h3>About Us</h3>
              <p>
                Discover and enjoy millions of songs at your fingertips. Our app
                is designed to make your music experience seamless and
                enjoyable.
              </p>
            </div>


            {/* Contact Section */}
            <div className="footer-section contact">
              <h3>Contact Us</h3>
              <p>Email: support@musicapp.com</p>
              <p>Phone: +1 234 567 890</p>
            </div>

            {/* Social Media Section */}
            <div className="footer-section social">
              <h3>Follow Us</h3>
              <div className="social-links">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2024 Caterpiller Music App. All Rights Reserved.</p>
          </div>
        </footer>
    </div>
  )
}
