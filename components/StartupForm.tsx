"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/Validation";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CreatePitch } from "@/lib/actions";

function StartupForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);
      console.log(
        "------------------------- These are the form values -------------------------"
      );
      console.log(formValues);

      const result = await CreatePitch(prevState, formData, pitch);
      console.log(
        "----------------- Result from creat pitch ----------------------"
      );
      console.log(result);
      if (result.status === "SUCCESS") {
        console.log("Successfully created");
        toast.success("Success", {
          description: "Your startup pitch has been created successfully",
        });

        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;

        setErrors(fieldErrors as unknown as Record<string, string>);

        toast.error("Error", {
          description: "Check your input and try again",
        });
        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      console.log(error);
      toast.error("Error", {
        description: "An unexpected error has occurred",
      });

      return {
        ...prevState,
        error: "An unexpected error has occured",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Startup Title"
        />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Startup Description"
        />
        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Startup Category (Tech, health, education)"
        />
        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="startup-form_input"
          required
          placeholder="Startup Image URL"
        />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="link" className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder: "Briefly describe your idea and what it solves",
            autoCapitalize: "none",
          }}
          previewOptions={{ disallowedElements: ["style"] }}
        />
        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
}

export default StartupForm;

// Seamlessly create stunning, branded image sliders for e-commerce, with background removal and integrated pricing

// Our solution is SlideDeck Pro, an all-in-one, AI-powered platform that streamlines the entire process of creating professional e-commerce product displays. With SlideDeck Pro, all of these problems are solved within a single workflow. The platform offers one-click background removal, powered by AI that works seamlessly even with complex images. It also provides intelligent color recommendations, helping you choose eye-catching, brand-aligned backgrounds that make your products stand out. Creating responsive, visually dynamic sliders is effortless, while integrated pricing tools make it easy to add product details directly onto each slide. To strengthen your brand identity and protect your intellectual property, SlideDeck Pro automatically applies your logo or initials to every design.

// The process is simple. First, upload your product photos directly to the platform. With just one click, you can remove the background and select a new color. Next, drag and drop your images into a slider template, add pricing, and let the system automatically apply your branding. Finally, export your finished product slider in a variety of formats, or embed it directly on your website with a simple snippet of code.

// https://images.unsplash.com/reserve/uZYSV4nuQeyq64azfVIn_15130980706_64134efc6e_o.jpg?q=80&w=2934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
