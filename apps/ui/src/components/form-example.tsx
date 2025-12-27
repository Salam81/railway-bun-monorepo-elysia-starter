import { arktypeResolver } from "@hookform/resolvers/arktype";
import { useMutation } from "@tanstack/react-query";
import { type } from "arktype";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { submitForm } from "@/lib/queries";

/**
 * Available role options for the form.
 */
const roleItems = [
	{ label: "Developer", value: "developer" },
	{ label: "Designer", value: "designer" },
	{ label: "Manager", value: "manager" },
	{ label: "Other", value: "other" },
] as const;

/**
 * Form validation schema using Arktype.
 * - name: Required string (non-empty)
 * - role: Optional role selection (can be null)
 * - comments: Optional string
 */
const formSchema = type({
	name: type("string>0").configure({
		message: () => "Name is required",
	}),
	role: '("developer" | "designer" | "manager" | "other") | null',
	comments: "string | undefined",
});

type FormData = typeof formSchema.infer;

const defaultValues: FormData = {
	name: "",
	role: null,
	comments: "",
};

/**
 * FormExample component - A user information form with validation.
 *
 * Features:
 * - Form validation using React Hook Form with Arktype resolver
 * - Async form submission using TanStack Query
 * - Toast notifications for success/error states
 * - Responsive layout with centered card design
 */
export function FormExample() {
	const [selectKey, setSelectKey] = useState(0);
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>({
		resolver: arktypeResolver(formSchema),
		defaultValues,
	});

	const handleReset = () => {
		reset(defaultValues);
		setSelectKey((prev) => prev + 1);
	};

	const { mutate, isPending } = useMutation({
		mutationFn: submitForm,
		onSuccess: (data) => {
			handleReset();
			toast.success(data.message);
		},
		onError: (error) => {
			toast.error(
				error instanceof Error ? error.message : "Failed to submit form",
			);
		},
	});

	/**
	 * Handles form submission.
	 * @param data - The validated form data
	 */
	const onSubmit = (data: FormData) => {
		mutate(data);
	};

	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<Card className="mx-auto w-full max-w-md">
				<CardHeader>
					<CardTitle>User Information</CardTitle>
					<CardDescription>Please fill in your details below</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<FieldGroup>
							<div className="grid grid-cols-2 gap-4">
								<Field>
									<FieldLabel htmlFor="small-form-name">
										Name <span className="text-red-600">*</span>
									</FieldLabel>
									<Input
										id="small-form-name"
										placeholder="Enter your name"
										{...register("name")}
									/>
									{errors.name && (
										<p className="text-sm text-red-600">
											{errors.name.message}
										</p>
									)}
								</Field>
								<Field>
									<FieldLabel htmlFor="small-form-role">Role</FieldLabel>
									<Controller
										name="role"
										control={control}
										render={({ field }) => (
											<Select
												key={selectKey}
												items={roleItems}
												selectedValue={field.value ?? undefined}
												onSelectedValueChange={field.onChange}
											>
												<SelectTrigger id="small-form-role">
													<SelectValue>
														{(value) =>
															value
																? roleItems.find((item) => item.value === value)
																		?.label
																: "Select a role"
														}
													</SelectValue>
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														{roleItems.map((item) => (
															<SelectItem key={item.value} value={item.value}>
																{item.label}
															</SelectItem>
														))}
													</SelectGroup>
												</SelectContent>
											</Select>
										)}
									/>
									{errors.role && (
										<p className="text-sm text-red-600">
											{errors.role.message}
										</p>
									)}
								</Field>
							</div>
							<Field>
								<FieldLabel htmlFor="small-form-comments">Comments</FieldLabel>
								<Textarea
									id="small-form-comments"
									placeholder="Add any additional comments"
									{...register("comments")}
								/>
								{errors.comments && (
									<p className="text-sm text-red-600">
										{errors.comments.message}
									</p>
								)}
							</Field>
							<Field orientation="horizontal">
								<Button type="submit" disabled={isPending}>
									{isPending ? "Submitting..." : "Submit"}
								</Button>
								<Button variant="outline" type="button" onClick={handleReset}>
									Cancel
								</Button>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
