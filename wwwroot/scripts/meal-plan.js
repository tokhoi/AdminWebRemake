window.mealPlan = window.mealPlan || {};

window.mealPlan.downloadFileFromBase64 = function (fileName, contentType, base64Content) {
    try {
        const binary = atob(base64Content);
        const bytes = new Uint8Array(binary.length);

        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }

        const blob = new Blob([bytes], { type: contentType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    } catch (error) {
        console.error("mealPlan.downloadFileFromBase64 failed", error);
    }
};
