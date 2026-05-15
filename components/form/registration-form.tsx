"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import img1 from "@/assets/images/IT_office.jpg";
import img2 from "@/assets/images/alqimi_logo.jpeg";

import { fields } from "@/constants/fields";
import {
  registrationSchema,
  RegistrationFormData,
} from "@/lib/validation";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import SuccessMessage from "@/components/message/success-message";

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      position: "",
      organization: "",
      password: "",
      confirmPassword: "",
    },
  });

const onSubmit = async (data: RegistrationFormData) => {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Something went wrong");
    }

    console.log("API Response:", result);

    setShowSuccess(true);

    reset();

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  } catch (error) {
    console.error("Submission Error:", error);
    alert("Failed to submit the form.");
  }
};

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  return (
    <main className="relative min-h-screen overflow-hidden">
      <SuccessMessage show={showSuccess} />
      {/* Background Image */}
      <Image
        src={img1}
        alt="Background"
        fill
        priority
        className="object-cover"
      />

      {/* Light Overlay */}
      <div className="absolute inset-0 bg-black/5" />

      {/* Form Container */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-4xl rounded-2xl border border-white/30 bg-white/75 shadow-2xl backdrop-blur-md">
          <CardContent className="p-3 ">
            {/* Logo */}
            <div className="mb-2 flex justify-center">
              <Image
                src={img2}
                alt="Logo"
                width={100}
                height={50}
                className="rounded-full object-contain"
              />
            </div>
              {/* Heading */}
            <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
              User Registration
            </h1>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {fields.map((field) => {
                  const error = errors[field.name as keyof RegistrationFormData];

                  return (
                    <div key={field.name} className="space-y-1">
                    {/* Label + Required Asterisk */}
                    <Label htmlFor={field.name} className="text-sm font-medium text-gray-900">
                    {field.label}
                    {field.required && (
                      <span className="font-bold text-black">*</span>
                    )}
                  </Label>

                    <div className="relative">
                    <Input
                      id={field.name}
                      type={
                        field.name === "password"
                          ? showPassword
                            ? "text"
                            : "password"
                          : field.name === "confirmPassword"
                          ? showConfirmPassword
                            ? "text"
                            : "password"
                          : field.type
                      }
                      placeholder={field.placeholder}
                      {...register(field.name)}
                      className={
                        error
                          ? "border-red-500 ring-1 ring-red-500 focus-visible:ring-1 focus-visible:ring-red-500 focus-visible:border-red-500 pr-10"
                          : field.name === "password" || field.name === "confirmPassword"
                          ? "pr-10"
                          : ""
                      }
                    />

                      {(field.name === "password" || field.name === "confirmPassword") && (
                        <button
                          type="button"
                          onClick={() => {
                            if (field.name === "password") {
                              setShowPassword((prev) => !prev);
                            } else {
                              setShowConfirmPassword((prev) => !prev);
                            }
                          }}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                          tabIndex={-1}
                        >
                          {field.name === "password" ? (
                            showPassword ? (
                              <Eye className="h-4 w-4" />
                            ) : (
                              <EyeOff className="h-4 w-4" />
                            )
                          ) : showConfirmPassword ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Error Message */}
                    <div className="min-h-[20px]">
                      {error && (
                        <p className="text-sm text-red-600">
                          {String(error.message)}
                        </p>
                      )}
                    </div>
                  </div>
                  );
                })}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="mx-auto block w-full rounded-lg bg-orange-600 text-base font-semibold text-black hover:bg-orange-700 md:w-[90%]"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}