import { ImageResponse } from "next/og";

export const runtime = "edge"; // Define o ambiente como Edge Function

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const imageUrl = searchParams.get("image");

    if (!imageUrl) {
        return new Response("Image URL is required", { status: 400 });
    }

    // Verifica se o imageUrl pertence ao domínio cs2data.info
    const allowedDomain = "cs2datainfo.vercel.app";
    const url = new URL(imageUrl);

    if (url.hostname !== allowedDomain) {
        return new Response("Not Found", { status: 404 });
    }

    // Retorna a imagem gerada com ofuscação e texto estilizado
    return new ImageResponse(
        (
            <div
                style={{
                    width: "1200px",
                    height: "630px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#121212",
                    position: "relative",
                }}
            >
                <img
                    src={imageUrl}
                    alt="og image"
                    style={{
                        width: "50%",
                        height: "50%",
                        objectFit: "contain",
                        filter: "blur(8px)", // Aplica o efeito de ofuscamento à imagem
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "10px",
                        right: "10px",
                        color: "white",
                        fontSize: "30px", // Aumenta o tamanho da fonte
                        fontWeight: "bold", // Deixa o texto em negrito
                    }}
                >
                    CS2DATA.info
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        },
    );
}
