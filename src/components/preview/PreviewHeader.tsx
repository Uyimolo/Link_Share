// import Button from "@/components/Button";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { useAuthContext } from "@/context/AuthContext";
// import Logo from "../brand/Logo";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { CgMoreVertical } from "react-icons/cg";

// const PreviewHeader = () => {
//   const router = useRouter();
//   const { user, username } = useAuthContext();

//   const handleShareLink = async () => {
//     if (!user) {
//       toast.error("You need to be logged in to share your profile.");
//       return;
//     }

//     // Define the user’s public profile URL based on users username
//     const shareUrl = `https://linksharer.vercel.app/u/${username}`;

//     // Check if navigator.share is supported
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: `Check out my Profile!`,
//           text: `Here's a link to my link collection.`,
//           url: shareUrl,
//         });
//         toast.success("Profile shared successfully!");
//       } catch (error) {
//         console.error("Error sharing profile:", error);
//         toast.error("Failed to share profile.");
//       }
//     } else {
//       // Fallback in case Web Share API is unsupported
//       toast.info(
//         "Sharing is not supported on this browser. Copy the link below:",
//       );
//       navigator.clipboard.writeText(shareUrl);
//       toast.success("Profile link copied to clipboard!");
//     }
//   };

//   return (
//     // <div className="mx-auto w-full">
//     //   {user ? (
//     //     <div className="flex justify-between gap-4">
//     //       <Button
//     //         className="md:max-w- mx-auto w-full md:w-fit md:max-w-none"
//     //         onClick={handleShareLink}
//     //       >
//     //         Share link
//     //       </Button>
//     //     </div>
//     //   ) : (
//     //     <div className="flex justify-between border border-white/20 p-4 shadow-xl backdrop-blur-sm rounded-xl bg-white/90">
//     //       <Logo className="md:hidden" />
//     //       <Logo showFullLogo className="hidden md:flex" />

//     //       <div className="flex items-center gap-4">
//     //         <Button
//     //           variant="secondary"
//     //           className="hidden w-fit md:block"
//     //           onClick={() => router.push("/register")}
//     //         >
//     //           Create account
//     //         </Button>
//     //         <Button className="w-fit" onClick={() => router.push("/login")}>
//     //           Sign in
//     //         </Button>
//     //       </div>
//     //     </div>
//     //   )}
//     // </div>

//     <div className="ml-auto mr-0 w-fit">
//       <DropdownMenu>
//         <DropdownMenuTrigger>
//           <CgMoreVertical className="text text-white" />
//         </DropdownMenuTrigger>
//         <DropdownMenuContent>
//           {!isPublic && (
//             <DropdownMenuItem>Share link collection</DropdownMenuItem>
//           )}
//           {isPublic && (
//             <>
//               <DropdownMenuItem>Share link collection</DropdownMenuItem>
//               <DropdownMenuItem>Share link collection</DropdownMenuItem>
//             </>
//           )}
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   ); 
// };

// export default PreviewHeader;
