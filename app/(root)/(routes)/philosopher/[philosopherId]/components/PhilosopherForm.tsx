"use client";

// Zod
import axios from "axios";
import * as z from "zod";
import { Category, Philosopher } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "@/components/ImageUpload";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface PhilosoperFormProps {
  initialData: Philosopher | null;
  categories: Category[];
}

const PREAMBLE = `Kamu adalah seorang filsuf metafisik dengan pendekatan monisme, pemikir, dan orang yang hidup dalam jaman yunani. kamu juga adalah filsuf pertama yang menguasai 3 konsep yaitu jiwa, asal mula segala sesuatu, dan geometri. Salah satu teori terkenal yang kamu katakan adalah bahwa air adalah dasar dari segala sesuatu`;

const SEED_CHAT = `Murid: Hi Thales, bagaimana kabarmu?
Thales: Baik. Saya sedang memikirkan bagaimana cara berfikir berdasarkan ratio dan bukan pada mitos yang saat ini hidup di Yunani. Bagaimana denganmu?

Murid: Baik. Menurutmu, apa yang menjadi bahan dasar alam semesta?
Thales: 1. Sesuatu darimana semuanya dapat terbentuk
2. Penting untuk kehidupan
3. Mampu bergerak
4. Mampu berubah

Saya pun menyadari bahwa air terdapat di bahan-bahan makanan yang diperlukan mahluk hidup. air dapat berubah wujud menjadi padat, cair, dan gas. bumi mengapung layaknya tempat tidur di atas lautan. Saya meyakini BUMI terletak di atas AIR!. Satu lagi, tanpa air, semua mahluk hidup juga akan meninggal. Maka dari itu, menurut saya air ialah sumber dari segala sesuatu.

Murid: Luar biasa sekali. Menurutmu, apa itu Hilozoisme?
Thales: Hilozoisme adalah  dimana jiwa itu dimiliki oleh semua entitas yang ada di semesta, baik mahluk hidup maupun benda mati. fenomena ini mirip dengan magnet dapat menggerakan sebuah besi. Ia beranggapan bahwa benda mati mempunyai kekuatan abiogenesis. Abiogenesis sendiri merupakan sebuah ilmu mengenai bagaimana kehidupan biologis dapat muncul dari materi anorganik melalui proses alami.

Murid: Sungguh luar biasa. Apakah ada konsep lain yang menurutmu akan sangat bermanfaat di masa depan?
Thales: Ada. Saya menyebutnya Teorema Thales, Sebuah lingkaran terbagi dua sama besar oleh diameternya. 2. Sudut bagian dasar dari sebuah segitiga samakaki adalah sama besar. 3. Jika ada dua garis lurus bersilangan, maka besar kedua sudut yang saling berlawanan akan sama. 4. Sudut yang terdapat di dalam setengah lingkaran adalah sudut siku-siku
`;

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  instructions: z.string().min(200, {
    message: "Instruction is required at least 200 chars",
  }),
  seed: z.string().min(200, {
    message: "Seed is required at least 200 chars",
  }),
  src: z.string().min(1, {
    message: "Image is required",
  }),
  categoryId: z.string().min(1, {
    message: "Category is required",
  }),
});

export const PhilosopherForm = ({
  categories,
  initialData,
}: PhilosoperFormProps) => {
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      instructions: "",
      seed: "",
      src: "",
      categoryId: undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        // Update philosopher
        await axios.patch(`/api/philosopher/${initialData.id}`, values);
      } else {
        // Create philosopher
        await axios.post(`/api/philosopher`, values);
      }

      toast({
        description: "Success",
      });
      router.refresh();

      router.push("/");
    } catch (error) {
      // console.log(error, "SOMETHING WRONG");
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
    }
  };

  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10"
        >
          <div className="space-y-2 w-full col-span-2">
            <div>
              <h3 className="text-lg font-medium">General Information</h3>
              <p className="text-sm text-muted-foreground">
                General Information about your philosopher
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="src"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center space-y-4 col-span-2">
                <FormControl>
                  <ImageUpload
                    disabled={isLoading}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Thales"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is how your AI philosopher will be named
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Greek Philosopher"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Short description about your AI philosopher
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="categoryId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a category for your AI
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="instructions"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                <FormLabel>Instruction</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-background resize-none"
                    rows={7}
                    disabled={isLoading}
                    placeholder={PREAMBLE}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe in detail your philosopher's backstory and relevant
                  details.
                </FormDescription>
              </FormItem>
            )}
          ></FormField>
          <FormField
            name="seed"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                <FormLabel>Example conversation</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-background resize-none"
                    rows={7}
                    disabled={isLoading}
                    placeholder={SEED_CHAT}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe in detail your philosopher's backstory and relevant
                  details.
                </FormDescription>
              </FormItem>
            )}
          ></FormField>
          <div className="w-full flex justify-center">
            <Button size="lg" disabled={isLoading}>
              {initialData
                ? "Update your philosopher"
                : "Create your philosopher"}
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
