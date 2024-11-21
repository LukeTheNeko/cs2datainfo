import { ImageResponse } from "next/og";
import crypto from "crypto";

export const runtime = "edge";

// Função para gerar um hash SHA-256 a partir da URL da imagem
function generateImageHash(imageUrl: string): string {
    return crypto.createHash('sha256').update(imageUrl).digest('hex');
}

// Função para obter a URL real da imagem com base no hash gerado
function getImageUrlByHash(imageHash: string): string | null {
    // Em vez de mapear manualmente, você pode construir a URL real da imagem
    // com base no hash, supondo que as imagens sigam uma estrutura de URL
    // específica ou armazená-las de alguma forma acessível.
    const baseUrl = "https://img.cs2data.info/static/panorama/images/econ/";
    return `${baseUrl}${imageHash}.png`; // Exemplo, ajustado conforme necessário
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get("image");

    if (!imageUrl) {
        return new Response("Image URL is required", { status: 400 });
    }

    // Gerar o hash da URL da imagem
    const imageHash = generateImageHash(imageUrl);

    // Obter a URL real da imagem usando o hash
    const imageRealUrl = getImageUrlByHash(imageHash);

    if (!imageRealUrl) {
        return new Response("Image not found", { status: 404 });
    }

    const allowedDomain = "img.cs2data.info"; // Verifique apenas o domínio
    const url = new URL(imageRealUrl);

    if (!url.hostname.endsWith(allowedDomain)) {
        return new Response("Invalid image source", { status: 403 });
    }

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
                    src={imageRealUrl}
                    alt="og image"
                    style={{
                        width: "75%",
                        height: "75%",
                        objectFit: "contain",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "10px",
                        right: "10px",
                        color: "white",
                        fontSize: "18px",
                        fontWeight: "bold",
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
