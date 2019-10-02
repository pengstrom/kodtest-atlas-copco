# The Treasure Hunter’s Arrangements

This is the webshop **Hidden Gems**. This is a code test, see `spec.pdf` for details.

Everything from the spec has been implemented. Additional features include:

1. Arbitrary number of attributes.
2. Option to restock shop.
3. Option to refinance character (get more gold (Au)).
4. Attribute calculation breakdown.
5. Three-part generated item names.

## Structure

The project uses a C# ASP.Net Core backend with a TypeScript React frontend.

## Future Work

Small changes are required to enable full multi-user support. Then, authentication could follow. The equipment type could also be made more general. The design could use more images in key places. The code is modular, so tests could easily be written.

## Running
Use `dotnet run` in this fodler to start the server and client. Then open `https://localhost:5001` in a browser. You may need to accept its self-signed certificate.