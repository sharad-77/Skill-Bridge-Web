import {
  ArrowLeft,
  Calendar,
  MoreVertical,
  Paperclip,
  Phone,
  Send,
  Smile,
  Star,
  Video
} from "lucide-react";
import { useState } from 'react';
import Button from '../../components/ui/Button';

const ChatPage = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(message);
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/mentorship-requests" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="h-5 w-5" />
            </a>
            <img
              alt="Alice Johnson"
              className="w-12 h-12 rounded-full object-cover"
              src="/placeholder.svg?height=60&amp;width=60"
            />
            <div>
              <h3 className="text-base font-semibold text-gray-900">Alice Johnson</h3>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                Online
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {[Phone, Video, Calendar, MoreVertical].map((Icon, i) => (
              <button
                key={i}
                className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
              >
                <Icon className="h-5 w-5" />
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Mentorship Details */}
      <section className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-blue-700">
          <Star className="h-4 w-4 text-blue-500" />
          <span className="font-medium">
            <strong>Career Development</strong> mentorship started on Jan 13
          </span>
        </div>
        <Button className="h-9 px-4 text-blue-600 bg-white border hover:bg-blue-50">
          View Details
        </Button>
      </section>

      {/* Chat Section */}
      <main className="flex-1 flex items-center justify-center px-4 ">
        <h1
          className="text-xl font-semibold text-white animate-pulse bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-2xl p-3"
          style={{
            animationDelay: '0.5s',
            animationDuration: '1s',
            animationIterationCount: 'infinite',
          }}
        >
          Coming Soon...
        </h1>
      </main>

      {/* Message Input */}
      <footer className="border-t bg-white px-6 py-4">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center gap-4 max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-3 text-gray-500">
            <Smile className="h-5 w-5" />
            <Paperclip className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 h-11 px-4 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Button
            type="submit"
            className="h-11 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </footer>
    </div>
  );
};

export default ChatPage;
