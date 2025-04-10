
        document.addEventListener("DOMContentLoaded", () => {
            const generateForm = document.querySelector(".generate-form");
            const imageGallery = document.querySelector(".image-gallery");

            // Replace this with a valid OpenAI API key
            const OPENAI_API_KEY = "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"; 
            let isImageGenerating = false;

            if (!generateForm || !imageGallery) {
                console.error("Required elements not found in the DOM");
                return;
            }

            const updateImageCard = (imageDataArray) => {
                imageDataArray.forEach((imgObject, index) => {
                    const imgCard = imageGallery.querySelectorAll(".img-card")[index];
                    if (!imgCard) return;

                    const imgElement = imgCard.querySelector("img");
                    const downloadBtn = imgCard.querySelector(".download-btn");

                    const aiGeneratedImg = `data:image/jpeg;base64,${imgObject.b64_json}`;
                    imgElement.src = aiGeneratedImg;
                    imgElement.onload = () => {
                        imgCard.classList.remove("loading");
                        if (downloadBtn) {
                            downloadBtn.setAttribute("href", aiGeneratedImg);
                            downloadBtn.setAttribute("download", `${new Date().getTime()}.jpg`);
                        }
                    };
                });
            };

            const generateAiImages = async (userPrompt, userImgQuantity) => {
                try {
                    if (!OPENAI_API_KEY || OPENAI_API_KEY === "your-api-key-here") {
                        throw new Error("Please provide a valid OpenAI API key");
                    }

                    const response = await fetch("https://api.openai.com/v1/images/generations", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${OPENAI_API_KEY}`
                        },
                        body: JSON.stringify({
                            prompt: userPrompt,
                            n: Number(userImgQuantity),
                            size: "512x512",
                            response_format: "b64_json"
                        })
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error?.message || "Failed to generate images! Please try again.");
                    }

                    const { data } = await response.json();
                    updateImageCard([...data]);

                } catch (error) {
                    alert(error.message);
                } finally {
                    isImageGenerating = false;
                }
            };

            const handleFormSubmission = (e) => {
                e.preventDefault();
                if (isImageGenerating) return;
                isImageGenerating = true;

                const userPrompt = e.target.querySelector(".prompt-input").value;
                const userImgQuantity = e.target.querySelector(".img-quantity").value;

                const imgCardMarkup = Array.from({ length: userImgQuantity }, () =>
                    `<div class="img-card loading">
                        <img src="image-loader.svg" alt="image">
                        <a href="#" class="download-btn">
                            <img src="download.svg" alt="download icon">
                        </a>
                    </div>`
                ).join("");

                imageGallery.innerHTML = imgCardMarkup;
                generateAiImages(userPrompt, userImgQuantity);
            };

            generateForm.addEventListener("submit", handleFormSubmission);
        });
