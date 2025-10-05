import React from 'react';
import './CelebrityTestimonials.css'; // Import the CSS file for custom styles

const CelebrityTestimonials = () => {
  return (
    <>
      <header className="site-header">
        <h1 className="sr-only">Celebrity Testimonials</h1>

        <div className="fieldset-wrapper">
          <fieldset>
            <legend className="sr-only">Effects</legend>

            <input type="radio" id="blink-effect" name="effect" value="blink" checked className="sr-only" />
            <label htmlFor="blink-effect">Blink</label>

            <input type="radio" id="horizontal-scroll-effect" name="effect" value="horizontal-scroll" className="sr-only" />
            <label htmlFor="horizontal-scroll-effect">Horizontal scroll</label>

            <input type="radio" id="backwards-scroll-effect" name="effect" value="backwards-scroll" className="sr-only" />
            <label htmlFor="backwards-scroll-effect">Backwards scroll</label>

            <input type="radio" id="zoom-scroll-effect" name="effect" value="zoom-scroll" className="sr-only" />
            <label htmlFor="zoom-scroll-effect">Zoom scroll</label>
          </fieldset>
        </div>

        <nav>
          <ul className="indicator">
            <li><a href="#snapping"><span className="sr-only">Snapping</span></a></li>
            <li><a href="#scrolling"><span className="sr-only">Scrolling</span></a></li>
            <li><a href="#layout"><span className="sr-only">Layout</span></a></li>
            <li><a href="#transition"><span className="sr-only">Transition</span></a></li>
            <li><a href="#caveats"><span className="sr-only">Caveats</span></a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="snapping" className="section">
          <div className="content">
            <h2><strong>First</strong>, we set up the <em>snapping</em> points</h2>

            <div className="text">
              <img src="/public/celebrity1.jpg" alt="Celebrity 1" />
              <p>Celebrity 1's testimonial goes here.</p>
            </div>
          </div>
        </section>
        <section id="scrolling" className="section">
          <div className="content">
            <h2><strong>Next</strong>, we set up the <em>scrolling</em> animation</h2>

            <div className="text">
              <img src="/public/celebrity2.jpg" alt="Celebrity 2" />
              <p>Celebrity 2's testimonial goes here.</p>
            </div>
          </div>
        </section>
        <section id="layout" className="section">
          <div className="content">
            <h2><strong>Then</strong>, we position a <em>fixed</em> layout</h2>

            <div className="text">
              <img src="/public/celebrity3.jpg" alt="Celebrity 3" />
              <p>Celebrity 3's testimonial goes here.</p>
            </div>
          </div>
        </section>
        <section id="transition" className="section">
          <div className="content">
            <h2><strong>Finally</strong>, we create the <em>transition</em> effects</h2>

            <div className="text">
              <img src="/public/celebrity4.jpg" alt="Celebrity 4" />
              <p>Celebrity 4's testimonial goes here.</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>That's it <span className="emoji">🌸</span></p>
      </footer>
    </>
  );
};

export default CelebrityTestimonials;
