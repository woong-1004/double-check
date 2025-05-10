import {
  CopilotRuntime,
  copilotRuntimeNextJSAppRouterEndpoint,
  OpenAIAdapter,
} from "@copilotkit/runtime";
import { NextRequest } from "next/server";

const copilotRuntime = new CopilotRuntime();

// --- POST 핸들러 (MCP 전용) ---
export const POST = async (req: NextRequest) => {
  const serviceAdapter = new OpenAIAdapter({ model: "gpt-4.1-mini" });

  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime: copilotRuntime,
    serviceAdapter,
    endpoint: "/api/chat",
  });

  return handleRequest(req);
};

export const runtime = "nodejs";
