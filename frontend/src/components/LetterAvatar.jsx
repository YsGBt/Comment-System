const colorPalette = [
    'bg-red-600', 'bg-blue-600', 'bg-green-600', 'bg-yellow-600',
    'bg-purple-600', 'bg-pink-600', 'bg-indigo-600', 'bg-teal-600'
];

const getColorClassName = (name) => {
    let hash = 0;
    if (name.length === 0) return colorPalette[0];
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colorPalette.length;
    return colorPalette[index];
};

export const LetterAvatar = ({ name, src, size = 'w-10 h-10' }) => {
    // Check if a valid image URL is provided (not empty string)
    const hasImage = src && src.trim() !== "";
    const initial = name ? name.trim().charAt(0).toUpperCase() : 'U';
    const bgColor = getColorClassName(name);

    const baseClasses = `${size} rounded-full object-cover flex items-center justify-center text-white font-semibold text-lg cursor-pointer hover:opacity-80 transition duration-150 ease-in-out`;

    if (hasImage) {
        return (
            <img
                src={src}
                alt={name}
                className={`${size} rounded-full object-cover cursor-pointer hover:opacity-80 transition duration-150 ease-in-out`}
            />
        );
    } else {
        return (
            <div className={`${baseClasses} ${bgColor}`}>
                {initial}
            </div>
        );
    }
};