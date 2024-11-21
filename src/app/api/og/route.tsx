import { ImageResponse } from "next/og";

export const runtime = "edge"; // Define o ambiente como Edge Function

export async function GET(request: Request) {
    // Verifica o IP do cliente para permitir somente o servidor ou IPs confiáveis
    const clientIp = request.headers.get("X-Forwarded-For") || "";

    // Substitua "Seu_IP" pelo IP ou intervalo de IPs do seu servidor
    if (clientIp !== "Seu_IP") {
        return new Response("Not Found", { status: 404 });
    }

    // Ou alternativamente, você pode usar o Referer para validar a origem
    const referer = request.headers.get("Referer");
    if (!referer || !referer.includes("cs2datainfo.vercel.app")) {
        return new Response("Not Found", { status: 404 });
    }

    // Obtém os parâmetros da URL
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get("image");

    if (!imageUrl) {
        return new Response("Image URL is required", { status: 400 });
    }

    // Retorna a imagem com o efeito de ofuscação e texto estilizado
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
                        filter: "blur(8px)", // Aplica o efeito de ofuscamento (blur) à imagem
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
