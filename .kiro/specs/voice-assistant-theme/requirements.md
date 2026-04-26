# Requirements Document

## Introduction

This feature redesigns the visual theme of the Voice Assistant in the Kisan AI Sahayak web app. The redesign covers two components: the FloatingVoiceAssistant button (fixed bottom-right on all pages) and the AssistantPanel (full-page view at `/assistant`). The goal is a visually impressive, modern, and engaging UI that fits the agricultural/nature identity of the app — using the existing green/blue palette, Framer Motion animations, and Tailwind CSS v4.

## Glossary

- **FloatingButton**: The fixed circular button rendered at the bottom-right corner of all pages except `/assistant`.
- **AssistantPanel**: The full-page voice assistant interface rendered at the `/assistant` route.
- **ActiveListening**: The state when the SpeechRecognition API is actively capturing user voice input (`isListening === true`).
- **LoadingState**: The state when the assistant is awaiting a response from Gemini (`isLoading === true`).
- **ChatBubble**: A single message unit in the conversation history, either from the user or the assistant.
- **QuickActionBar**: The row of shortcut buttons (Mausam dekho, Fasal sujhao, Leaf disease) above the chat area.
- **InputBar**: The bottom form area containing the text input, mic button, speak button, and send button.
- **Theme**: The visual design system including colors, gradients, shadows, animations, and typography applied to the Voice Assistant components.
- **PrimaryGreen**: `#4CAF50` — the app's primary brand color.
- **AccentBlue**: `#2196F3` — the app's secondary accent color.
- **DarkGreen**: `#1a4a38` — the app's dark green used for deep contrast.

---

## Requirements

### Requirement 1: FloatingButton Visual Redesign

**User Story:** As a farmer using the app, I want the floating voice assistant button to look visually striking and inviting, so that I am drawn to tap it and use the assistant.

#### Acceptance Criteria

1. THE FloatingButton SHALL display a gradient background using PrimaryGreen to AccentBlue (`from-[#4CAF50] to-[#2196F3]`).
2. THE FloatingButton SHALL render with a multi-layer