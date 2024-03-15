function calculateReadTime(content) {
    const words = content.split(' ');
    const wordCount = words.length;
    const readTime = Math.ceil(wordCount / 100 * 0.3);
    return readTime;
}
export default calculateReadTime;