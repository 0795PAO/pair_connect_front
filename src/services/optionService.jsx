


export const fetchOptions = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                stacks: ["Frontend", "Backend", "Fullstack"],
                languages: ["JavaScript", "Python", "TypeScript"],
                levels: ["Junior", "Middle", "Senior"]
            });
        }, 1000); 
    });
};
