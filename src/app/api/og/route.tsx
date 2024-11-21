import { ImageResponse } from "next/og"; // Importa o ImageResponse para criar a imagem OG
// O módulo 'crypto' não pode ser usado diretamente em Edge Functions. Em vez disso, usamos a Web Crypto API.

export const runtime = "edge"; // Define que a função é executada como uma Edge Function

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const imageUrl = searchParams.get("image");

    if (!imageUrl) {
        return new Response("Image URL is required", { status: 400 });
    }

    const allowedDomain = "https://img.cs2data.info";
    const url = new URL(imageUrl);

    // Verifica se a URL da imagem vem do domínio permitido
    if (url.origin !== allowedDomain) {
        return new Response("Invalid image source", { status: 403 });
    }

    // Gerar o hash SHA-256 da URL da imagem usando a Web Crypto API
    const hash = await generateImageHash(imageUrl);

    // Agora você pode usar o hash gerado para ofuscar a URL ou fazer outras manipulações
    console.log("Generated hash:", hash);

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

// Função para gerar o hash SHA-256 usando a Web Crypto API
async function generateImageHash(imageUrl: string): Promise<string> {
    // Usa o TextEncoder para converter a URL da imagem em bytes
    const encoder = new TextEncoder();
    const data = encoder.encode(imageUrl);

    // Gera o hash SHA-256 da URL
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    // Converte o hash em uma string hexadecimal
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // Converte o buffer em um array de bytes
    const hashHex = hashArray
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join(""); // Converte os bytes em uma string hexadecimal

    return hashHex;
}
