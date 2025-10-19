import { useState } from 'react';

export default function Avatar({ src = '/profile.jpg', alt = 'Profile photo', initials = 'DS' }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative">
      <div className="h-28 w-28 rounded-full bg-[conic-gradient(#8b5cf6,#ec4899,#22d3ee,#8b5cf6)] animate-[spin_10s_linear_infinite]" />
      <div className="absolute inset-1 flex items-center justify-center overflow-hidden rounded-full bg-gray-900">
        {!failed ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="text-xl font-semibold text-white">{initials}</span>
        )}
      </div>
    </div>
  );
}