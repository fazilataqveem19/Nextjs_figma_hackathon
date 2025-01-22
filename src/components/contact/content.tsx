'use client';
import React, { useState } from "react";
import Link from "next/link";
import { AiFillLike, AiFillDislike } from "react-icons/ai";

const faqs = [
  {
    ques: "Does my card need international purchases enabled?",
    ans: "Yes, we recommend asking your bank to enable international purchases on your card. You will be notified at checkout if international purchases need to be enabled."
  },
  {
    ques: "Can I pay for my order with multiple methods?",
    ans: "No, payment for Nike orders can't be split between multiple payment methods."
  },
  {
    ques: "What payment method is accepted for SNKRS orders?",
    ans: "You can use any accepted credit card to pay for your SNKRS order."
  },
  {
    ques: "Why don't I see Apple Pay as an option?",
    ans: "To see Apple Pay as an option in the Nike App or on Nike.com, you'll need to use a compatible Apple device running the latest OS, be signed in to your iCloud account and have a supported card in your Wallet. Additionally, you'll need to use Safari to use Apple Pay on Nike.com."
  },
  {
    ques: "Can I use a prepaid card to pay for my order?",
    ans: "Yes, prepaid cards are accepted as long as they meet the standard payment requirements."
  },
  {
    ques: "How do I know if my payment was successful?",
    ans: "You will receive a confirmation email once your payment has been successfully processed."
  },
  {
    ques: "Are my payment details secure?",
    ans: "Yes, Nike ensures that your payment details are secure and encrypted during the transaction process."
  },
  {
    ques: "Can I change my payment method after placing an order?",
    ans: "No, payment methods cannot be changed after the order has been placed."
  },
  {
    ques: "Why was my payment declined?",
    ans: "Your payment may be declined for several reasons, including insufficient funds, incorrect card details, or restrictions set by your bank. Please contact your bank for more information."
  },
  {
    ques: "Can I use my Nike gift card online?",
    ans: "Yes, Nike gift cards can be used for online purchases. Enter the gift card details during checkout."
  }
];

const Content = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = faqs.filter((faq) =>
    faq.ques.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 md:px-10">
      <h1 className="font-medium text-2xl">WHAT PAYMENT OPTIONS CAN I USE ON NIKE ORDERS?</h1>
      <div>
        <p className="py-3">
          We want to make buying your favourite Nike shoes and gear online fast and easy, and we accept the following payment options:
        </p>
        <div className="space-y-4 p-4">
          <p>Visa, Mastercard, Diners Club, Discover, American Express, Visa Electron, Maestro</p>
          <p>If you enter your PAN information at checkout, you&apos;ll be able to pay for your order with PayTM or a local credit or debit card.</p>
          <p>Apple Pay</p>
        </div>
        <p className="py-3">
          <span className="underline font-medium">Nike Members</span> can store multiple debit or credit cards in their profile for faster checkout. If you&apos;re not already a Member, join us today.
        </p>
        <div className="flex items-center gap-4 py-4">
          <Link href={"/"} className="px-6 py-2 bg-[#111111] text-white text-sm rounded-full">JOIN US</Link>
          <Link href={"/"} className="px-6 py-2 bg-[#111111] text-white text-sm rounded-full">SHOP NIKE</Link>
        </div>
      </div>

      <div>
        <h1 className="text-xl font-medium">FAQs</h1>
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md my-4"
        />
        {filteredFaqs.map((data, index) => (
          <div key={index} className="py-4">
            <p className="font-medium mb-1">{data.ques}</p>
            <span className="text-[#111]">{data.ans}</span>
          </div>
        ))}
        {filteredFaqs.length === 0 && (
          <p className="text-gray-500">No FAQs match your search.</p>
        )}
      </div>
      <span className="text-sm py-3">Was this answer helpful?</span>
      <div className="text-2xl flex items-center gap-2 py-3">
        <AiFillLike />
        <AiFillDislike />
      </div>
      <div>
        <h2 className="text-xl text-zinc-500 font-medium">Contact Us</h2>
        <form className="space-y-4 my-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="message">Message</label>
            <textarea
              id="message"
              placeholder="How can we help you?"
              className="w-full p-2 border rounded-md"
              rows={4}
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-[#111111] text-white text-sm rounded-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Content;
