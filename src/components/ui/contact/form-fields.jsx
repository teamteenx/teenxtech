"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactFormFields({ form, errors, onChange, onSubmit }) {
  return (
    <form
      className="mx-auto flex max-w-screen-md flex-col gap-6 rounded-lg border p-10"
      onSubmit={onSubmit}
      noValidate
    >
      {/* Honeypot (hidden) – managed by the hook via onChange with id="botField" */}
      <input
        type="text"
        id="botField"
        tabIndex={-1}
        autoComplete="off"
        onChange={onChange}
        className="hidden"
        aria-hidden="true"
      />

      <div className="flex gap-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            type="text"
            id="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={onChange}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-err" : undefined}
            required
          />
          {errors.firstName && (
            <p id="firstName-err" className="text-xs text-red-500">
              {errors.firstName}
            </p>
          )}
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            type="text"
            id="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-err" : undefined}
          required
        />
        {errors.email && (
          <p id="email-err" className="text-xs text-red-500">
            {errors.email}
          </p>
        )}
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="subject">Subject</Label>
        <Input
          type="text"
          id="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={onChange}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-err" : undefined}
          required
        />
        {errors.subject && (
          <p id="subject-err" className="text-xs text-red-500">
            {errors.subject}
          </p>
        )}
      </div>

      <div className="grid w-full gap-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Type your message here."
          value={form.message}
          onChange={onChange}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-err" : undefined}
          required
        />
        {errors.message && (
          <p id="message-err" className="text-xs text-red-500">
            {errors.message}
          </p>
        )}
      </div>

      <Button className="w-full" type="submit">
        Send Message
      </Button>
    </form>
  );
}
