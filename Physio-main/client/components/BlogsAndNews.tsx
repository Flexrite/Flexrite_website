import React, { useState, useEffect } from 'react';
import ElegantShadowTitle from './ui/ElegantShadowTitle';

// Define interfaces for type safety
interface BlogPost {
  authorName: string;
  authorImage: string;
  date: string;
  title: string;
  image: string;
  excerpt: string;
}

// BlogCard Component with variable image height and transition effects
function BlogCard({ post, isFeatured = false, isVisible = true }: { 
  post: BlogPost; 
  isFeatured?: boolean;
  isVisible?: boolean;
}) {
  return (
    <div
      className={`backdrop-blur-lg bg-white/10 border border-white/20 h-full relative p-4 md:p-6 flex flex-col
                 rounded-lg shadow-xl transition-all duration-500 ease-in-out hover:scale-[1.02]
                 group cursor-pointer hover:bg-white/15 hover:border-white/30
                 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}
    >
      {/* Image Area with conditional height */}
      <img
        src={post.image}
        alt={post.title}
        className={`w-full object-cover mb-3 md:mb-4 rounded-md
                   transition-transform duration-300 ease-out group-hover:scale-105
                   ${isFeatured ? 'h-48 md:h-56 lg:h-64' : 'h-32 md:h-36 lg:h-40'}`}
      />

      {/* Author and Meta Info */}
      <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
        <img
          src={post.authorImage}
          alt={post.authorName}
          className="w-6 h-6 md:w-8 md:h-8 rounded-full flex-shrink-0 object-cover
                     border-2 border-white transition-transform duration-200 ease-out group-hover:rotate-6"
        />
        <div className="flex-1">
          {/* Author name */}
          <p className="text-white text-xs md:text-sm font-semibold font-source-sans-pro" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}>
            {post.authorName}
          </p>
          {/* Date */}
          <p className="text-white/80 text-xs font-source-sans-pro">
            {post.date}
          </p>
        </div>
      </div>

      {/* Content Preview */}
      <h3 className="text-white text-sm md:text-base font-bold font-playfair-display line-clamp-2 mb-1 md:mb-2" style={{ textShadow: '0 0 12px rgba(255, 255, 255, 0.3)' }}>
        {post.title}
      </h3>
      
      {/* Excerpt for non-featured cards */}
      {!isFeatured && (
        <p className="text-white/80 text-xs md:text-sm line-clamp-2">
          {post.excerpt}
        </p>
      )}
    </div>
  );
}

// Featured Blog Card Component
function FeaturedBlogCard({ post, isVisible = true }: { post: BlogPost; isVisible?: boolean }) {
  return (
    <div className={`backdrop-blur-lg bg-white/10 border border-white/20 h-full relative p-4 md:p-6 flex flex-col rounded-lg shadow-2xl transition-all duration-500 ease-in-out hover:scale-[1.01] group hover:bg-white/15 hover:border-white/30 cursor-pointer
                    ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-40 md:h-56 lg:h-72 object-cover mb-4 md:mb-6 rounded-md transition-transform duration-500 ease-in-out group-hover:scale-105"
      />
      <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
        <img
          src={post.authorImage}
          alt={post.authorName}
          className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex-shrink-0 object-cover border-2 md:border-4 border-white transition-transform duration-300 ease-out group-hover:rotate-3"
        />
        <div className="flex-1">
          <p className="text-white text-base md:text-lg font-semibold mb-1 font-source-sans-pro" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}>
            {post.authorName}
          </p>
          <p className="text-white/80 text-xs md:text-sm font-source-sans-pro">
            {post.date}
          </p>
        </div>
      </div>
      <h3 className="text-white text-lg md:text-xl lg:text-2xl font-bold font-playfair-display mb-2 md:mb-3" style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}>
        {post.title}
      </h3>
      <p className="text-white/80 text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-none">
        {post.excerpt}
      </p>
      <button className="mt-3 md:mt-4 px-3 py-1 md:px-4 md:py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors self-start text-sm md:text-base">
        Read More
      </button>
    </div>
  );
}

// Main BlogsAndNews Component
export default function BlogsAndNews() {
  const [currentBlogs, setCurrentBlogs] = useState<BlogPost[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const allBlogPosts: BlogPost[] = [
    {
      authorName: "Doctor Arvind V Reddy",
      authorImage: "/reddy.jpg",
      date: "July 28, 2025",
      title: "Dr. Priyanka Das Joins WWE as National Official Physiotherapist",
      image: "/Blog1.jpg",
      excerpt: "In a landmark appointment, Dr. Priyanka Das becomes the first female physiotherapist to join WWE's medical team, bringing extensive experience in sports injury management."
    },
    {
      authorName: "Deccan Chronicle",
      authorImage: "/auth2.png",
      date: "Oct 21, 2024",
      title: "Rakul Preet Singh suffered a serious back injury while performing an 80-kg deadlift without proper precautions.",
      image: "/Blog2.jpg",
      excerpt: "Actress Rakul Preet Singh's workout injury highlights the importance of proper form and professional guidance during heavy weight training sessions."
    },
    {
      authorName: "Chandni Kumar Mehra",
      authorImage: "/auth3.jpg",
      date: "July 22, 2025",
      title: "Sustainable Living: Tips for a Greener Home",
      image: "/Blog3.jpg",
      excerpt: "Discover simple yet effective ways to make your home more eco-friendly while improving your physical and mental wellbeing through sustainable practices."
    },
    {
      authorName: "Wohl Physio",
      authorImage: "/doe.jpg",
      date: "August 8, 2018",
      title: "Role of Physiotherapy in Fitness",
      image: "/blog4.png",
      excerpt: "Explore how physiotherapy extends beyond injury recovery to play a crucial role in preventive care, performance enhancement, and overall fitness maintenance."
    },
  ];

  // Initialize with first 4 blog posts
  useEffect(() => {
    setCurrentBlogs(allBlogPosts.slice(0, 4));
  }, []);

  // Function to rotate blog posts with smooth transition
  const rotateBlogPosts = () => {
    if (isTransitioning) return; // Prevent multiple clicks during transition
    
    setIsTransitioning(true);
    
    // Start fade out
    setTimeout(() => {
      // Calculate the next set of posts
      const newIndex = (currentIndex + 1) % allBlogPosts.length;
      const nextPosts = [];
      for (let i = 0; i < 4; i++) {
        const index = (newIndex + i) % allBlogPosts.length;
        nextPosts.push(allBlogPosts[index]);
      }
      
      // Update content immediately
      setCurrentBlogs(nextPosts);
      setCurrentIndex(newIndex);
      
      // Wait a bit then fade back in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 250); // Half the transition duration for smoother effect
  };

  // Set up automatic rotation every 8 seconds
  useEffect(() => {
    const interval = setInterval(rotateBlogPosts, 8000);
    return () => clearInterval(interval);
  }, [currentIndex, isTransitioning]);

  return (
    <section className="py-10 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Centered Heading */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <ElegantShadowTitle>
            Blogs and News
          </ElegantShadowTitle>
        </div>

        {/* Bento Box Grid - Responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 auto-rows-[minmax(200px,auto)] md:auto-rows-[minmax(250px,auto)] lg:auto-rows-[minmax(300px,auto)]">
          {/* Large featured card - changes position based on screen size */}
          <div className="sm:col-span-2 lg:col-span-2 sm:row-span-2">
            <FeaturedBlogCard 
              post={currentBlogs[0] || allBlogPosts[0]}
              isVisible={!isTransitioning}
            />
          </div>

          {/* Medium card - changes position based on screen size */}
          <div className="sm:col-span-2 lg:col-span-2">
            <BlogCard 
              post={currentBlogs[1] || allBlogPosts[1]}
              isVisible={!isTransitioning}
            />
          </div>

          {/* Two small cards - stack on mobile, side by side on larger screens */}
          <div className="sm:col-span-1 lg:col-span-1">
            <BlogCard 
              post={currentBlogs[2] || allBlogPosts[2]}
              isVisible={!isTransitioning}
            />
          </div>
          <div className="sm:col-span-1 lg:col-span-1">
            <BlogCard 
              post={currentBlogs[3] || allBlogPosts[3]}
              isVisible={!isTransitioning}
            />
          </div>
        </div>

        {/* Manual rotation controls */}
        <div className="flex justify-center mt-6 md:mt-8">
          <button 
            onClick={rotateBlogPosts}
            disabled={isTransitioning}
            className={`px-5 py-2 bg-white/10 border border-white/20 text-white rounded-lg transition-all duration-300 ease-in-out
                       ${isTransitioning 
                         ? 'opacity-50 cursor-not-allowed' 
                         : 'hover:bg-white/20 hover:scale-105'}`}
          >
            {isTransitioning ? 'Loading...' : 'Show New Content'}
          </button>
        </div>

        {/* Optional: Add progress indicators */}
        <div className="flex justify-center mt-3 md:mt-4 space-x-2">
          {allBlogPosts.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 
                         ${index === currentIndex ? 'bg-white' : 'bg-white/30'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}