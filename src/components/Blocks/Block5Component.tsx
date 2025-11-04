export const Block5Component = () => {
    const empresas = [
        {
            name: 'La PRIMERA comunidad energética de la Marina Alta',
            videoUrl: 'https://youtube.com/shorts/bkqnWVb3bfM?si=13DLwwdA7F_FXJLa'
        },
        {
            name: 'Tasca Eulalia',
            videoUrl: 'https://www.youtube.com/watch?v=kFo2qjQO1hU'
        },
        {
            name: 'Hotel los Ángeles Dénia',
            videoUrl: 'https://youtube.com/shorts/df98Y0Pjj5k?si=LEojRreVu-a4BJDp'
        }
    ];

    const getYouTubeVideoId = (url: string) => {
        if (!url) return null;

        const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
        if (shortsMatch) return shortsMatch[1];

        const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
        if (watchMatch) return watchMatch[1];

        const shortUrlMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
        if (shortUrlMatch) return shortUrlMatch[1];

        return null;
    };

    return (
        <div className="container mx-auto px-14 py-14">
            {/* Título centrado arriba */}
            <h2 className="text-3xl font-bold text-center mb-10">
                Empresas que ya confían en Apolo Energies
            </h2>

            {/* Carrusel horizontal de videos */}
            <div className="flex justify-between gap-6 overflow-x-auto">

                {empresas.map((empresa, index) => (
                    <div key={index} className="flex flex-col items-center w-[400px] shrink-0">
                        <h4 className="font-semibold mb-2 text-center text-2xl h-16 overflow-hidden">
                            {empresa.name}
                        </h4>

                        <div className="w-full h-[380px] bg-gray-100 p-4 rounded-lg flex items-center justify-center overflow-hidden">
                            {empresa.videoUrl ? (
                                <iframe
                                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(empresa.videoUrl)}`}
                                    title={empresa.name}
                                    className="w-full h-full rounded"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <p className="text-gray-600 text-center px-2">
                                    Sin url del video
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
